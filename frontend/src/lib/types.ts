export type Role = 'client' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: Role
  avatar?: string
  phone?: string
  createdAt: string
}

export type FitnessGoal =
  | 'Weight Loss'
  | 'Muscle Gain'
  | 'Body Recomposition'
  | 'Strength Training'
  | 'Fat Burning'
  | 'Overall Fitness'

export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All levels'

export interface HealthProfile {
  age: number
  gender: 'Male' | 'Female'
  heightCm: number
  weightKg: number
  targetWeightKg?: number
  targetDate?: string
  fitnessLevel: FitnessLevel
  goal: FitnessGoal
  medicalConditions: string[]
  workoutExperience: string
  trainingDays: string[]
  equipment: string[]
  foodPreferences: string[]
  lifestyle: string
  targetCalories?: number
}

export interface Onboarding {
  completed: boolean
  profile?: HealthProfile
  programId?: string
  planId?: string
  completedAt?: string
}

export interface Client {
  id: string
  userId: string
  name: string
  email: string
  phone?: string
  avatar?: string
  status: 'active' | 'onboarding' | 'paused' | 'inactive'
  programId?: string
  planId?: string
  subscriptionEnds?: string
  joinedAt: string
  profile?: HealthProfile
  progress: ProgressEntry[]
  achievements: string[]
  streak: number
  lastActive?: string
}

export interface ProgressEntry {
  id: string
  clientId: string
  date: string
  weightKg?: number
  bodyFat?: number
  bmi?: number
  chest?: number
  waist?: number
  hips?: number
  notes?: string
}

export interface WorkoutSession {
  id: string
  clientId: string
  date: string
  name: string
  status: 'completed' | 'missed' | 'scheduled'
  durationMin: number
  calories?: number
  sets: ExerciseSet[]
}

export interface ExerciseSet {
  exercise: string
  sets: number
  reps: number
  weight?: number
  completed: boolean
}

export interface MealEntry {
  id: string
  clientId: string
  date: string
  meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  photo?: string
  completed: boolean
}

export interface WaterEntry {
  id: string
  clientId: string
  date: string
  ml: number
}

export interface Message {
  id: string
  clientId: string
  sender: 'coach' | 'client'
  senderName: string
  text: string
  createdAt: string
  read: boolean
}

export interface Announcement {
  id: string
  title: string
  body: string
  createdAt: string
  audience: 'all' | 'active'
}

export interface Notification {
  id: string
  clientId: string
  title: string
  body: string
  createdAt: string
  read: boolean
}

export interface Program {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  duration: string
  weeks: number
  level: FitnessLevel
  goal: FitnessGoal | 'Mixed'
  price: number
  plan: 'monthly' | 'quarterly' | 'yearly'
  popular?: boolean
  icon: string
  benefits: string[]
  features: string[]
  color: string
}

export interface Plan {
  id: string
  name: string
  tagline: string
  monthly: number
  quarterly: number
  yearly: number
  popular?: boolean
  features: string[]
  highlights?: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  result: string
  program: string
  before: string
  after: string
  months: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: 'Workout' | 'Nutrition' | 'Lifestyle' | 'Fitness'
  readMinutes: number
  author: string
  date: string
  cover: string
  content: string[]
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export interface Coupon {
  id: string
  code: string
  percentOff: number
  active: boolean
  expiresAt?: string
}

export interface Payment {
  id: string
  clientId: string
  clientName: string
  amount: number
  plan: string
  program: string
  method: 'Card' | 'Bank Transfer' | 'CBE' | 'Telebirr' | 'Mobile Money'
  status: 'paid' | 'pending' | 'refunded'
  coupon?: string
  createdAt: string
  reference: string
  paymentRef?: string
}

export interface Referral {
  id: string
  clientId: string
  code: string
  signups: number
  reward: number
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system'
}

export interface Exercise {
  id: string
  name: string
  muscle: string
  equipment: string
  level: FitnessLevel
  image?: string
  instructions: string[]
}

export interface Recipe {
  id: string
  name: string
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Shake'
  calories: number
  protein: number
  carbs: number
  fat: number
  tags: string[]
  ingredients: string[]
}

export interface AttendanceRecord {
  id: string
  clientId: string
  date: string
  status: 'present' | 'late' | 'absent'
  session: string
}

export interface Assessment {
  id: string
  clientId: string
  date: string
  type: 'Initial' | 'Monthly Check-in' | 'Movement Screen'
  bmi?: number
  bodyFat?: number
  score: number
  notes: string
  metrics: { label: string; value: string }[]
}

export interface ClientFile {
  id: string
  clientId: string
  name: string
  kind: 'Program' | 'Nutrition' | 'Progress Report' | 'Contract' | 'Assessment'
  size: string
  uploadedAt: string
}

export interface Goal {
  id: string
  clientId: string
  title: string
  target: string
  deadline: string
  progress: number
  status: 'on-track' | 'at-risk' | 'achieved' | 'upcoming'
}

export interface Partner {
  id: string
  slug: string
  name: string
  avatar: string
  cover: string
  role: string
  bio: string
  specialties: string[]
  experience: number
  clients: number
  programs: number
  rating: number
  location: string
  verified: boolean
}

export interface Template {
  id: string
  slug: string
  title: string
  category: 'workout' | 'nutrition' | 'meal-plan' | 'assessment'
  image: string
  price: number
  description: string
  items: number
  partnerSlug: string
  rating: number
  downloads: number
}

export interface Course {
  id: string
  slug: string
  title: string
  image: string
  price: number
  compareAt?: number
  description: string
  lessons: number
  hours: number
  level: FitnessLevel
  partnerSlug: string
  rating: number
  students: number
  badge?: string
}

export interface Service {
  id: string
  title: string
  icon: string
  description: string
  features: string[]
}

export interface DB {
  users: User[]
  clients: Client[]
  programs: Program[]
  plans: Plan[]
  testimonials: Testimonial[]
  blogPosts: BlogPost[]
  faqs: FAQItem[]
  coupons: Coupon[]
  payments: Payment[]
  referrals: Referral[]
  messages: Message[]
  announcements: Announcement[]
  notifications: Notification[]
  workouts: WorkoutSession[]
  meals: MealEntry[]
  water: WaterEntry[]
  appointments: { id: string; name: string; email: string; phone: string; date: string; time: string; type: string; message: string; createdAt: string; status: 'new' | 'booked' | 'done' }[]
  subscribers: { email: string; createdAt: string }[]
  leads: { id: string; name: string; email: string; goal: string; createdAt: string }[]
  exercises: Exercise[]
  recipes: Recipe[]
  attendance: AttendanceRecord[]
  assessments: Assessment[]
  files: ClientFile[]
  goals: Goal[]
  partners: Partner[]
  templates: Template[]
  courses: Course[]
  services: Service[]
}
