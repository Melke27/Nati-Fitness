import type { LucideIcon } from 'lucide-react'
import { Flame, Dumbbell, Zap, HeartPulse, Crosshair } from 'lucide-react'

export type AnswerKey = 'goal' | 'gender' | 'experience'

export interface QuizState {
  goal: string
  gender: string
  experience: string
}

export const EMPTY_ANSWERS: QuizState = { goal: '', gender: '', experience: '' }

export interface Option {
  id: string
  label: string
  description: string
  icon: LucideIcon
}

export interface Question {
  key: AnswerKey
  title: string
  helper: string
  optional?: boolean
  options: Option[]
}

export const QUESTIONS: Question[] = [
  {
    key: 'goal',
    title: 'WHAT IS YOUR PRIMARY GOAL?',
    helper: 'This helps us tailor the program to your objectives.',
    options: [
      { id: 'weight_loss', label: 'Weight Loss / Fat Loss', description: 'Burn fat while maintaining muscle.', icon: Flame },
      { id: 'muscle_gain', label: 'Muscle Gain', description: 'Build muscle and gain size.', icon: Dumbbell },
      { id: 'strength', label: 'Strength', description: 'Build strength and improve performance.', icon: Zap },
      { id: 'general_fitness', label: 'General Fitness', description: 'Improve overall fitness, health, and energy.', icon: HeartPulse },
      { id: 'endurance', label: 'Endurance', description: 'Improve cardio fitness and stamina.', icon: Crosshair },
    ],
  },
  {
    key: 'gender',
    title: 'WHAT IS YOUR GENDER?',
    helper: 'Helps us recommend the right training program.',
    optional: true,
    options: [
      { id: 'male', label: 'Male', description: 'Training matched to male physiology.', icon: Dumbbell },
      { id: 'female', label: 'Female', description: 'Training matched to female physiology.', icon: Dumbbell },
      { id: 'prefer_not', label: 'Prefer not to say', description: 'Neutral program recommendation.', icon: HeartPulse },
    ],
  },
  {
    key: 'experience',
    title: 'WHAT IS YOUR TRAINING EXPERIENCE?',
    helper: 'Matches you with the right difficulty level.',
    options: [
      { id: 'beginner', label: 'Beginner', description: 'Less than 6 months', icon: HeartPulse },
      { id: 'intermediate', label: 'Intermediate', description: '6 months to 3 years', icon: Dumbbell },
      { id: 'advanced', label: 'Advanced', description: '3+ years', icon: Zap },
    ],
  },
]

export interface RecommendedPlan {
  id: string
  name: string
  tagline: string
  bestFor: string
  includes: string[]
  duration: string
  priceLabel: string
  priceEtb: number
  spotlight: boolean
}

export const RECOMMENDED_PLANS: Record<string, RecommendedPlan> = {
  starter_transformation: {
    id: 'starter_transformation',
    name: 'STARTER TRANSFORMATION',
    tagline: 'Your first coach-built leap to a fat-burning, muscle-preserving body.',
    bestFor: 'People who want a personalized plan with expert guidance while staying accountable on their own.',
    includes: [
      'Personalized workout program',
      'Personalized nutrition plan',
      'Exercise video library',
      'Weekly progress check-ins',
      'Coach support',
    ],
    duration: '3 Months',
    priceLabel: '17,999 ETB / $99',
    priceEtb: 17999,
    spotlight: true,
  },
  fat_loss_transformation: {
    id: 'fat_loss_transformation',
    name: 'FAT LOSS TRANSFORMATION',
    tagline: 'Trained hard? Now lose fat without giving up strength.',
    bestFor: 'Experienced trainees focused on shedding body fat while preserving hard-earned muscle and strength.',
    includes: [
      'Advanced fat-loss programming',
      'Personalized nutrition plan',
      'Exercise video library',
      'Weekly strategy check-ins',
      'Direct coach support',
    ],
    duration: '3 Months',
    priceLabel: '21,999 ETB / $119',
    priceEtb: 21999,
    spotlight: true,
  },
  muscle_building_starter: {
    id: 'muscle_building_starter',
    name: 'MUSCLE BUILDING STARTER',
    tagline: 'Lay the foundation for lean muscle.',
    bestFor: 'New lifters ready to build muscle the right way from day one.',
    includes: [
      'Personalized progressive workout plan',
      'Muscle-building nutrition plan',
      'Exercise video library',
      'Weekly progress check-ins',
      'Coach support',
    ],
    duration: '3 Months',
    priceLabel: '17,999 ETB / $99',
    priceEtb: 17999,
    spotlight: true,
  },
  muscle_growth_pro: {
    id: 'muscle_growth_pro',
    name: 'MUSCLE GROWTH PRO',
    tagline: 'Advanced periodization for serious mass.',
    bestFor: 'Intermediate to advanced lifters who want accelerated, well-coached muscle growth.',
    includes: [
      'Advanced progressive overload plan',
      'Custom hypertrophy nutrition',
      'Exercise video library',
      'Weekly video check-ins',
      'Direct coach support',
    ],
    duration: '4 Months',
    priceLabel: '26,999 ETB / $149',
    priceEtb: 26999,
    spotlight: true,
  },
  strength_performance: {
    id: 'strength_performance',
    name: 'STRENGTH PERFORMANCE',
    tagline: 'Get systematically stronger, session after session.',
    bestFor: 'Trainees focused on building real strength and athletic performance with technique coaching.',
    includes: [
      'Strength-focused progressive program',
      'Technique & form coaching',
      'Performance tracking',
      'Weekly check-ins',
      'Coach support',
    ],
    duration: '3 Months',
    priceLabel: '19,999 ETB / $109',
    priceEtb: 19999,
    spotlight: true,
  },
  fitness_foundation: {
    id: 'fitness_foundation',
    name: 'FITNESS FOUNDATION',
    tagline: 'A complete, sustainable health and energy reset.',
    bestFor: 'Anyone looking to improve overall fitness, health and daily energy with a balanced, simple plan.',
    includes: [
      'Personalized all-round workout plan',
      'Balanced nutrition guidance',
      'Daily activity & habits tracking',
      'Weekly progress check-ins',
      'Coach support',
    ],
    duration: '3 Months',
    priceLabel: '15,999 ETB / $89',
    priceEtb: 15999,
    spotlight: true,
  },
  endurance_performance: {
    id: 'endurance_performance',
    name: 'ENDURANCE PERFORMANCE',
    tagline: 'Build cardio capacity and stamina that lasts.',
    bestFor: 'Athletes and trainees focused on improving cardio fitness, conditioning and stamina.',
    includes: [
      'Periodized endurance program',
      'Conditioning & stamina plans',
      'Heart-rate & pace guidance',
      'Weekly progress check-ins',
      'Coach support',
    ],
    duration: '3 Months',
    priceLabel: '17,999 ETB / $99',
    priceEtb: 17999,
    spotlight: true,
  },
}