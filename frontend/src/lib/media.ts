/* Royalty-free imagery (Unsplash) with gradient fallbacks behind every <img>. */

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

export const MEDIA = {
  coach: U('photo-1571731956672-f2b94d7dd0cb', 1000),
  coachAlt: U('photo-1558611848-73f7eb4001a1', 1000),
  hero: '/nati-hero.jpg',
  heroAlt: U('photo-1571019613454-1cb2f99b2d8b', 1400),
  gym: U('photo-1534438327276-14e5300c3a48', 1200),
  gymDark: U('photo-1576678927484-cc907957088c', 1200),
  barbell: U('photo-1517963879433-6ad2b056d712', 1200),
  deadlift: U('photo-1517836357463-d25dfeac3438', 1200),
  trainer: U('photo-1541534741688-6078c6bfb5c5', 1200),
  womanFit: U('photo-1571019613454-1cb2f99b2d8b', 1200),
  womanFit2: U('photo-1548690312-e3b507d8c110', 1200),
  running: U('photo-1538805060514-97d9cc17730c', 1200),
  runWoman: U('photo-1517963879433-6ad2b056d712', 1200),
  boxing: U('photo-1549719386-74dfcbf7dbed', 1200),
  yoga: U('photo-1544367567-0f2fcb009e0b', 1200),
  stretching: U('photo-1571019613454-1cb2f99b2d8b', 1200),
  nutrition: U('photo-1512621776951-a57141f2eefd', 1200),
  salad: U('photo-1540420773420-3366772f4999', 1200),
  mealPrep: U('photo-1490645935967-10de6ba17061', 1200),
  supplements: U('photo-1596704017254-9b121068fb31', 1200),
  sleep: U('photo-1505576399279-565b52d4ac71', 1200),
  community: U('photo-1571388208497-71bedc66e932', 1200),
  outdoor: U('photo-1541534741688-6078c6bfb5c5', 1200),
  plyo: U('photo-1550259979-ed79b48d2a30', 1200),
  athlete: U('photo-1517836357463-d25dfeac3438', 1200),
  home: U('photo-1517963879433-6ad2b056d712', 1200),
  group: U('photo-1571388208497-71bedc66e932', 1200),
}

/* Gallery set (public masonry) */
export const GALLERY_MEDIA = [
  { key: 'gym', url: MEDIA.gym, tag: 'Strength' },
  { key: 'barbell', url: MEDIA.barbell, tag: 'Training' },
  { key: 'trainer', url: MEDIA.trainer, tag: 'Coaching' },
  { key: 'womanFit', url: MEDIA.womanFit, tag: 'Lifestyle' },
  { key: 'runWoman', url: MEDIA.runWoman, tag: 'Outdoor' },
  { key: 'yoga', url: MEDIA.yoga, tag: 'Mobility' },
  { key: 'nutrition', url: MEDIA.nutrition, tag: 'Nutrition' },
  { key: 'boxing', url: MEDIA.boxing, tag: 'Conditioning' },
  { key: 'deadlift', url: MEDIA.deadlift, tag: 'Strength' },
  { key: 'community', url: MEDIA.community, tag: 'Community' },
  { key: 'athlete', url: MEDIA.athlete, tag: 'Athlete' },
  { key: 'plyo', url: MEDIA.plyo, tag: 'Plyometrics' },
]

export const AVATAR = (seed: string) =>
  `https://i.pravatar.cc/160?img=${Math.abs([...seed].reduce((a, c) => a + c.charCodeAt(0), 0)) % 70}`

export const AVATARS = {
  sarah: AVATAR('Sarah Johnson'),
  david: AVATAR('David Okafor'),
  coach: AVATAR('Coach Nati'),
}

export const BLOG_COVERS: Record<string, string> = {
  nutrition: MEDIA.nutrition,
  workout: MEDIA.barbell,
  lifestyle: MEDIA.sleep,
  fitness: MEDIA.womanFit,
}
