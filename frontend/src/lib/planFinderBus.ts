/* ---------------- Global PlanFinder trigger bus ----------------
 * Lets any button anywhere (navbar, CTA bands, hero) open the questionnaire
 * without threading context through the whole tree.
 */

const OPEN_EVENT = 'coachnati:planfinder:open'
const CLOSE_EVENT = 'coachnati:planfinder:close'

export function openPlanFinder() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

export function closePlanFinder(restore = true) {
  window.dispatchEvent(new CustomEvent(CLOSE_EVENT, { detail: { restore } }))
}