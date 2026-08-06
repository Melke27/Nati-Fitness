import { useState } from 'react'
import { Plus, Droplets, Drumstick, Wheat, Salad, Camera, Check } from 'lucide-react'
import { useDB, getSession, addMeal, addWater, type MealKind } from '@/lib/store'
import { todayKey, cn } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { Button, Badge, Card, Progress, Modal } from '@/components/ui'
import { RingChart } from '@/components/charts'

const TARGETS = { calories: 2000, protein: 120, carbs: 220, fat: 65 }
const WATER_TARGET = 2500

export default function ClientNutrition() {
  const db = useDB()
  const session = getSession()!
  const client = db.clients.find((c) => c.userId === session.userId)!
  const { success } = useToast()
  const today = todayKey()

  const meals = db.meals.filter((m) => m.clientId === client.id && m.date === today)
  const totals = meals.reduce(
    (a, m) => ({ calories: a.calories + m.calories, protein: a.protein + m.protein, carbs: a.carbs + m.carbs, fat: a.fat + m.fat }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )
  const water = db.water.filter((w) => w.clientId === client.id && w.date === today).reduce((a, w) => a + w.ml, 0)

  const [modal, setModal] = useState<MealKind | null>(null)
  const [mealForm, setMealForm] = useState({ name: '', calories: 400, protein: 30, carbs: 40, fat: 12 })

  const submitMeal = () => {
    if (!modal) return
    addMeal({ clientId: client.id, meal: modal, ...mealForm })
    success('Meal logged! 🍽️')
    setModal(null)
    setMealForm({ name: '', calories: 400, protein: 30, carbs: 40, fat: 12 })
  }

  const addWaterCup = (ml: number) => {
    addWater(client.id, ml)
    success(`+${ml}ml logged 💧`)
  }

  const remaining = Math.max(0, TARGETS.calories - totals.calories)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-content">Nutrition</h1>
          <p className="text-sm text-content-muted">Hit your daily targets · plan & tracker</p>
        </div>
        <Button variant="outline" size="md" onClick={() => addWaterCup(500)}><Droplets className="h-4 w-4" /> +500ml water</Button>
      </div>

      {/* Targets */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-content-muted">Calories</p>
            <p className="text-2xl font-black text-content">{totals.calories.toLocaleString()}</p>
            <p className="text-[11px] font-bold text-content-faint">of {TARGETS.calories.toLocaleString()} · {remaining.toLocaleString()} left</p>
          </div>
          <RingChart value={(totals.calories / TARGETS.calories) * 100} size={84} stroke={8} color="#F59E0B" label={`${Math.round((totals.calories / TARGETS.calories) * 100)}%`} />
        </Card>
        {[
          { label: 'Protein', value: totals.protein, target: TARGETS.protein, icon: Drumstick, color: '#E11D48' },
          { label: 'Carbs', value: totals.carbs, target: TARGETS.carbs, icon: Wheat, color: '#F59E0B' },
          { label: 'Water', value: water, target: WATER_TARGET, icon: Droplets, color: '#22C55E' },
        ].map((m) => (
          <Card key={m.label} className="flex items-center justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold text-content-muted"><m.icon className="h-3.5 w-3.5" /> {m.label}</p>
              <p className="text-2xl font-black text-content">{m.label === 'Water' ? (m.value / 1000).toFixed(1) + 'L' : m.value + 'g'}</p>
              <p className="text-[11px] font-bold text-content-faint">of {m.label === 'Water' ? '2.5L' : m.target + 'g'}</p>
            </div>
            <RingChart value={(m.value / m.target) * 100} size={84} stroke={8} color={m.color} label={`${Math.round((m.value / m.target) * 100)}%`} />
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        {/* Meal plan */}
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black text-content">Today's meals</h2>
            <Badge variant="success">On plan</Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as MealKind[]).map((meal) => {
              const found = meals.filter((m) => m.meal === meal)
              return (
                <div key={meal} className="rounded-2xl border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-black text-content">{meal}</p>
                    {found.length === 0 && (
                      <button onClick={() => setModal(meal)} className="flex items-center gap-1 text-xs font-black text-accent-dark hover:underline dark:text-accent">
                        <Plus className="h-3.5 w-3.5" /> Log
                      </button>
                    )}
                  </div>
                  {found.length > 0 ? (
                    <div className="space-y-2">
                      {found.map((m) => (
                        <div key={m.id} className="rounded-xl bg-surface-subtle/60 p-3 dark:bg-surface-subtle">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-content">{m.name}</p>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-warning">{m.calories} kcal</span>
                          </div>
                          <div className="mt-1 flex gap-3 text-[10px] font-bold text-content-muted">
                            <span>P {m.protein}g</span><span>C {m.carbs}g</span><span>F {m.fat}g</span>
                          </div>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setModal(meal)}>
                        <Plus className="h-3.5 w-3.5" /> Add another
                      </Button>
                    </div>
                  ) : (
                    <button onClick={() => setModal(meal)} className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-6 text-xs font-bold text-content-faint transition hover:border-accent hover:text-content">
                      <Camera className="h-5 w-5" />
                      {meal === 'Dinner' ? 'Not logged yet' : `Tap to log ${meal.toLowerCase()}`}
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          {/* Water tracker */}
          <div className="mt-6 rounded-2xl border border-border p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-black text-content"><Droplets className="h-4 w-4 text-success" /> Water intake</p>
              <span className="text-xs font-black text-content-muted">{Math.min(water, WATER_TARGET)} / 2,500 ml</span>
            </div>
            <Progress value={(water / WATER_TARGET) * 100} className="h-3" />
            <div className="mt-3 flex gap-2">
              {[250, 500, 750].map((ml) => (
                <Button key={ml} variant="outline" size="sm" onClick={() => addWaterCup(ml)}>+{ml}ml</Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Plan preview */}
        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 text-sm font-black text-content">Today's plan (sample)</h2>
            <div className="space-y-3">
              {[
                { meal: 'Breakfast', name: 'Protein Oats with Berries', kcal: 420, done: true },
                { meal: 'Lunch', name: 'Grilled Chicken Bowl', kcal: 540, done: true },
                { meal: 'Dinner', name: 'Salmon & Quinoa', kcal: 510, done: false },
                { meal: 'Snack', name: 'Greek Yogurt Parfait', kcal: 290, done: true },
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-full border-2', m.done ? 'border-success bg-success text-white' : 'border-border')}>
                    {m.done && <Check className="h-4 w-4" strokeWidth={3} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-content">{m.name}</p>
                    <p className="text-[11px] text-content-muted">{m.meal}</p>
                  </div>
                  <span className="text-xs font-black text-warning">{m.kcal} kcal</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-sm font-black text-content">Nutrition tips from Coach</h2>
            <ul className="space-y-2 text-sm text-content-muted">
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" /> Aim for a palm-sized protein source at every meal.</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" /> Veggies first — they keep you full for fewer calories.</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" /> Stop eating ~2h before bed for better sleep.</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Meal modal */}
      <Modal open={!!modal} onClose={() => setModal(null)} title={`Log ${modal}`}>
        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-[13px] font-bold text-content">Meal name</span>
            <input
              value={mealForm.name}
              onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
              placeholder="e.g. Grilled chicken & rice"
              className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm focus:border-accent-dark focus:outline-none dark:bg-surface-subtle"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Calories', key: 'calories', max: 2000 },
              { label: 'Protein (g)', key: 'protein', max: 200 },
              { label: 'Carbs (g)', key: 'carbs', max: 400 },
              { label: 'Fat (g)', key: 'fat', max: 150 },
            ].map((f) => (
              <label key={f.key} className="block space-y-1.5">
                <span className="text-[13px] font-bold text-content">{f.label}</span>
                <input
                  type="number"
                  min={0}
                  max={f.max}
                  value={mealForm[f.key as keyof typeof mealForm]}
                  onChange={(e) => setMealForm({ ...mealForm, [f.key]: Number(e.target.value) })}
                  className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm focus:border-accent-dark focus:outline-none dark:bg-surface-subtle"
                />
              </label>
            ))}
          </div>
          <Button variant="accent" className="w-full" onClick={submitMeal} disabled={!mealForm.name}>
            <Salad className="h-4 w-4" /> Save meal
          </Button>
        </div>
      </Modal>
    </div>
  )
}
