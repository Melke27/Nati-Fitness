import { RECOMMENDED_PLANS, type QuizState, type RecommendedPlan } from './planFinderData'

export type PlanId =
  | 'starter_transformation'
  | 'fat_loss_transformation'
  | 'muscle_building_starter'
  | 'muscle_growth_pro'
  | 'strength_performance'
  | 'fitness_foundation'
  | 'endurance_performance'

/**
 * Dedicated plan recommendation service.
 *
 * Kept isolated from the UI so the rules can be tuned in one place without
 * touching components. Always returns a valid plan so the flow never dead-ends.
 */
export function recommendPlan(answers: QuizState): RecommendedPlan {
  const goal = answers.goal
  const experience = answers.experience
  const beginner = experience === 'beginner'

  let id: PlanId

  switch (goal) {
    case 'weight_loss':
      id = beginner ? 'starter_transformation' : 'fat_loss_transformation'
      break
    case 'muscle_gain':
      id = beginner ? 'muscle_building_starter' : 'muscle_growth_pro'
      break
    case 'strength':
      id = 'strength_performance'
      break
    case 'general_fitness':
      id = beginner ? 'fitness_foundation' : 'strength_performance'
      break
    case 'endurance':
      id = 'endurance_performance'
      break
    default:
      id = beginner ? 'fitness_foundation' : 'strength_performance'
  }

  return RECOMMENDED_PLANS[id]
}

export type { RecommendedPlan }