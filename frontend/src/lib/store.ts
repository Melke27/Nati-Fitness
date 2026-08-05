import { useSyncExternalStore } from 'react'
import type { DB } from './types'
import { buildSeed } from './seed'
import { uid, todayKey } from './utils'

const DB_KEY = 'coachnati:db:v4'
const SESSION_KEY = 'coachnati:session'

let db: DB = load()
let version = 0
const listeners = new Set<() => void>()

function load(): DB {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as DB
      if (parsed && parsed.users && parsed.clients) return parsed
    }
  } catch {
    /* corrupted storage — reseed */
  }
  const seed = buildSeed()
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(seed))
  } catch {
    /* storage unavailable */
  }
  return seed
}

function emit() {
  version++
  listeners.forEach((l) => l())
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db))
  } catch {
    /* storage full or unavailable */
  }
}

function mutate(fn: (draft: DB) => void) {
  fn(db)
  emit()
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getSnapshot() {
  return db
}

export function useDB() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export function resetDB() {
  db = buildSeed()
  emit()
}

export const store = {
  get: () => db,
  set: mutate,
  reset: resetDB,
}

export function findUser(email: string) {
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export function getUser(id?: string | null) {
  if (!id) return null
  return db.users.find((u) => u.id === id) ?? null
}

export function getClientByUser(userId: string) {
  return db.clients.find((c) => c.userId === userId)
}

export function getProgram(id?: string) {
  if (!id) return null
  return db.programs.find((p) => p.id === id) ?? null
}

export function getPlan(id?: string) {
  if (!id) return null
  return db.plans.find((p) => p.id === id) ?? null
}

/* ---------------- session ---------------- */

export interface Session {
  userId: string
  name: string
  email: string
  role: 'client' | 'admin'
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function setSession(s: Session | null) {
  if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s))
  else localStorage.removeItem(SESSION_KEY)
}

/* ---------------- helper actions ---------------- */

export function registerUser(data: { name: string; email: string; password: string; phone?: string }) {
  const existing = findUser(data.email)
  if (existing) throw new Error('An account with this email already exists')

  const userId = `user_${uid()}`
  mutate((d) => {
    d.users.push({
      id: userId,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: 'client',
      createdAt: new Date().toISOString(),
    })
    d.clients.push({
      id: `client_${userId}`,
      userId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: 'onboarding',
      joinedAt: new Date().toISOString(),
      progress: [],
      achievements: [],
      streak: 0,
    })
  })
  return userId
}

export function loginUser(email: string, password: string) {
  const user = findUser(email)
  if (!user || user.password !== password) throw new Error('Invalid email or password')
  return user
}

export function saveOnboarding(userId: string, payload: { profile: unknown; programId: string; planId: string }) {
  mutate((d) => {
    const client = d.clients.find((c) => c.userId === userId)
    if (!client) return
    client.profile = payload.profile as DB['clients'][number]['profile']
    client.programId = payload.programId
    client.planId = payload.planId
    client.status = 'active'
    client.joinedAt = client.joinedAt || new Date().toISOString()
    client.subscriptionEnds = new Date(Date.now() + 30 * 86400000).toISOString()
    client.lastActive = todayKey()
  })
}

export function addPayment(data: { clientId: string; clientName: string; amount: number; plan: string; program: string; method: PaymentMethod }) {
  const payment = {
    id: `pay_${uid()}`,
    clientId: data.clientId,
    clientName: data.clientName,
    amount: data.amount,
    plan: data.plan,
    program: data.program,
    method: data.method,
    status: 'paid' as const,
    createdAt: new Date().toISOString(),
    reference: `CN-${new Date().getFullYear()}-${String(db.payments.length + 1).padStart(4, '0')}`,
  }
  mutate((d) => d.payments.push(payment))
  return payment
}

export type PaymentMethod = 'Card' | 'Bank Transfer' | 'Mobile Money'

export function logWorkout(data: { clientId: string; name: string; durationMin: number; calories: number; date?: string }) {
  const w = {
    id: `w_${uid()}`,
    clientId: data.clientId,
    date: data.date || todayKey(),
    name: data.name,
    status: 'completed' as const,
    durationMin: data.durationMin,
    calories: data.calories,
    sets: [],
  }
  mutate((d) => d.workouts.push(w))
  return w
}

export function addMeal(data: { clientId: string; meal: MealKind; name: string; calories: number; protein: number; carbs: number; fat: number }) {
  mutate((d) =>
    d.meals.push({
      id: `m_${uid()}`,
      clientId: data.clientId,
      date: todayKey(),
      meal: data.meal,
      name: data.name,
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
      completed: true,
    }),
  )
}

export type MealKind = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'

export function addWater(clientId: string, ml: number) {
  mutate((d) => d.water.push({ id: `wt_${uid()}`, clientId, date: todayKey(), ml }))
}

export function logWeight(clientId: string, weightKg: number, bodyFat?: number) {
  mutate((d) => {
    const c = d.clients.find((x) => x.id === clientId)
    const bmi = c?.profile ? c.profile.weightKg : 0
    c?.progress.push({
      id: `pr_${uid()}`,
      clientId,
      date: todayKey(),
      weightKg,
      bodyFat,
      bmi: bmi > 0 ? undefined : undefined,
    })
    if (c?.profile) c.profile.weightKg = weightKg
  })
}

export function sendMessage(clientId: string, sender: 'coach' | 'client', senderName: string, text: string) {
  mutate((d) =>
    d.messages.push({
      id: `msg_${uid()}`,
      clientId,
      sender,
      senderName,
      text,
      createdAt: new Date().toISOString(),
      read: false,
    }),
  )
}

export function markMessagesRead(clientId: string) {
  mutate((d) => d.messages.forEach((m) => (m.clientId === clientId ? (m.read = true) : m)))
}

export function addAppointment(data: { name: string; email: string; phone: string; date: string; time: string; type: string; message: string }) {
  mutate((d) =>
    d.appointments.push({
      id: `app_${uid()}`,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'new',
    }),
  )
}

export function addSubscriber(email: string) {
  mutate((d) => d.subscribers.push({ email, createdAt: new Date().toISOString() }))
}

export function addLead(data: { name: string; email: string; goal: string }) {
  mutate((d) => d.leads.push({ id: `lead_${uid()}`, ...data, createdAt: new Date().toISOString() }))
}

export function applyCoupon(code: string): number {
  const coupon = db.coupons.find((c) => c.code.toLowerCase() === code.toLowerCase() && c.active)
  if (!coupon) throw new Error('Invalid or expired coupon')
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) throw new Error('This coupon has expired')
  return coupon.percentOff
}

export function deleteDB() {
  try {
    localStorage.removeItem(DB_KEY)
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* noop */
  }
  db = buildSeed()
  emit()
}
