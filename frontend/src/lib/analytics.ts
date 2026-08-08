/* ---------------- Analytics (guarded) ---------------- */

export type PlanFinderEvent =
  | 'questionnaire_opened'
  | 'questionnaire_step_1_completed'
  | 'questionnaire_step_2_completed'
  | 'questionnaire_step_3_completed'
  | 'questionnaire_completed'
  | 'plan_recommended'
  | 'plan_selected'
  | 'plan_checkout_started'
  | 'questionnaire_abandoned'

const ENABLED = false

/**
 * No-op until a real analytics provider (GA4, Plausible, Mixpanel, …) is wired
 * in. Events are intentionally funneled through one function so tracking can be
 * switched on without touching components.
 */
export function track(event: PlanFinderEvent, data?: Record<string, unknown>) {
  if (!ENABLED) return
  // eslint-disable-next-line no-console
  console.debug('[analytics]', event, data)
}