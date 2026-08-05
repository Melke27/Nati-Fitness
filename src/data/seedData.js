export const DEFAULT_PLANS = [
  { id: 'plan-basic', name: 'Basic Tier', price: 29, duration: 'month', features: ['Gym Floor Access', 'Basic Locker Room', '1 Fitness Assessment', 'Free Wi-Fi'], disabled: ['Group Classes', 'Personal Trainer', 'Spa & Sauna'] },
  { id: 'plan-premium', name: 'Elite Performance', price: 59, duration: 'month', features: ['All Gym Access', 'Premium Locker & Sauna', 'Unlimited Group Classes', 'Monthly Trainer Consultation', 'Free Wi-Fi'], disabled: ['Private VIP Lounge'] },
  { id: 'plan-vip', name: 'VIP Ultimate', price: 99, duration: 'month', features: ['24/7 Access All Locations', 'Private VIP Lounge & Spa', 'Unlimited Classes', 'Dedicated Personal Trainer', 'Free Nutrition Consultation', 'Complimentary Gym Apparel'], disabled: [] },
];

export const DEFAULT_TRAINERS = [
  { id: 'trainer-alex', name: 'Coach Alex Rivera', role: 'Strength & Conditioning Specialist', bio: 'Former competitive powerlifter with 10+ years coaching experience. Focuses on biomechanics, compound lifts, and progressive overload.', photo: '🏋️‍♂️' },
  { id: 'trainer-sarah', name: 'Coach Sarah Jenkins', role: 'Cardio & HIIT Coordinator', bio: 'Certified athletics trainer specializing in explosive agility, fat loss, and metabolic conditioning. Loves group coaching and upbeat energy.', photo: '🏃‍♀️' },
  { id: 'trainer-marcus', name: 'Coach Marcus Chen', role: 'Yoga & Flexibility Instructor', bio: 'Brings a mindful approach to fitness. Focuses on core stabilization, posture corrections, flexibility training, and injury rehabilitation.', photo: '🧘‍♂️' },
];

export const DEFAULT_MEMBERS = [
  { id: 'member-john', name: 'John Doe', email: 'john@example.com', password: 'password', phone: '+1 (555) 123-4567', planId: 'plan-premium', trainerId: 'trainer-alex', status: 'active', startDate: '2026-01-10', expiryDate: '2026-09-10', barcode: 'TRN-1082-99', bio: 'Determined to build muscle mass and improve general conditioning.' },
  { id: 'member-jane', name: 'Jane Smith', email: 'jane@example.com', password: 'password', phone: '+1 (555) 987-6543', planId: 'plan-vip', trainerId: 'trainer-sarah', status: 'active', startDate: '2026-02-15', expiryDate: '2027-02-15', barcode: 'TRN-2309-88', bio: 'Training for a local half-marathon and working on posture.' },
  { id: 'member-bob', name: 'Bob Johnson', email: 'bob@example.com', password: 'password', phone: '+1 (555) 456-7890', planId: 'plan-basic', trainerId: '', status: 'expired', startDate: '2025-05-01', expiryDate: '2026-05-01', barcode: 'TRN-8742-12', bio: 'Recreation user. Enjoys standard cardio machines.' },
];

export const DEFAULT_WORKOUTS = [
  {
    memberId: 'member-john',
    days: [
      {
        day: 'Day 1: Upper Body Push',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: 8, weight: 185 },
          { name: 'Overhead Press', sets: 3, reps: 10, weight: 115 },
          { name: 'Dumbbell Incline Flyes', sets: 3, reps: 12, weight: 45 },
          { name: 'Tricep Rope Pushdowns', sets: 4, reps: 15, weight: 60 },
        ],
      },
      {
        day: 'Day 2: Lower Body Strength',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: 6, weight: 225 },
          { name: 'Romanian Deadlifts', sets: 3, reps: 10, weight: 185 },
          { name: 'Leg Extensions', sets: 3, reps: 12, weight: 110 },
          { name: 'Standing Calf Raises', sets: 4, reps: 15, weight: 150 },
        ],
      },
    ],
  },
  {
    memberId: 'member-jane',
    days: [
      {
        day: 'Day 1: Endurance & HIIT',
        exercises: [
          { name: 'Treadmill Interval Runs', sets: 1, reps: '20 mins', weight: 'HIIT' },
          { name: 'Kettlebell Swings', sets: 4, reps: 20, weight: 35 },
          { name: 'Medicine Ball Slams', sets: 3, reps: 15, weight: 15 },
          { name: 'Plank Holds', sets: 3, reps: '60 secs', weight: 'BW' },
        ],
      },
    ],
  },
];

export const DEFAULT_ATTENDANCE = [
  { id: 'att-1', memberId: 'member-john', date: '2026-08-01', time: '08:14 AM' },
  { id: 'att-2', memberId: 'member-john', date: '2026-08-03', time: '08:05 AM' },
  { id: 'att-3', memberId: 'member-john', date: '2026-08-04', time: '08:21 AM' },
  { id: 'att-4', memberId: 'member-jane', date: '2026-08-02', time: '06:30 PM' },
  { id: 'att-5', memberId: 'member-jane', date: '2026-08-04', time: '07:15 PM' },
  { id: 'att-6', memberId: 'member-bob', date: '2026-04-20', time: '02:00 PM' },
];

export const DEFAULT_PAYMENTS = [
  { id: 'inv-101', memberId: 'member-john', amount: 59, status: 'paid', date: '2026-07-10', method: 'Visa ending 4242' },
  { id: 'inv-102', memberId: 'member-john', amount: 59, status: 'paid', date: '2026-08-10', method: 'Visa ending 4242' },
  { id: 'inv-103', memberId: 'member-jane', amount: 99, status: 'paid', date: '2026-07-15', method: 'MasterCard ending 9012' },
  { id: 'inv-104', memberId: 'member-bob', amount: 29, status: 'paid', date: '2026-04-01', method: 'PayPal' },
];

export const DEFAULT_MESSAGES = [
  { from: 'trainer-alex', to: 'member-john', timestamp: '2026-08-04 10:15 AM', content: 'Hey John, how did that push workout feel yesterday? Make sure you focus on progressive overload.' },
  { from: 'member-john', to: 'trainer-alex', timestamp: '2026-08-04 11:30 AM', content: 'Hey coach! Felt really good. I managed to bench 185lbs for all 4 sets of 8 reps! Triceps are definitely sore today.' },
  { from: 'trainer-alex', to: 'member-john', timestamp: '2026-08-04 11:45 AM', content: 'Excellent work! Next week we will add 5 lbs to the bench or aim for 9 reps. Keep it up.' },
];

export const DEFAULT_BLOG = [
  { id: 'blog-1', title: 'Top 5 Progressive Overload Techniques', author: 'Coach Alex Rivera', date: 'August 1, 2026', summary: 'Unlock plateaus by applying these simple strategies to elevate your strength gains.', content: 'Progressive overload is the foundation of muscle hypertrophy and strength building. To keep making progress, you must challenge your muscles. Here are five simple techniques you can use:\n\n1. Increase the Load: Add weight to the bar.\n2. Increase Volume: Perform more reps or sets.\n3. Alter Tempo: Focus on a slower eccentric (lowering) phase.\n4. Reduce Rest Intervals: Push through with less rest between sets.\n5. Improve Form: Execute exercises with cleaner biomechanics.\n\nExperiment with these one at a time to prevent overtraining!' },
  { id: 'blog-2', title: 'Hydration and Athletic Endurance', author: 'Coach Sarah Jenkins', date: 'July 24, 2026', summary: 'Why dehydration ruins your workout and how to structure your daily fluid intake.', content: 'Even mild dehydration—losing just 2% of your body water weight—can reduce athletic performance by up to 20%. Dehydration limits blood volume, placing extra stress on the cardiovascular system and making high-intensity exercise feel significantly harder.\n\nStructure your hydration strategy:\n- 2 Hours Before: Drink 17-20 oz of water.\n- During Workout: Sip 7-10 oz every 15-20 minutes.\n- Post Workout: Rehydrate with water and electrolytes based on intensity. Keep active and stay hydrated!' },
];

export const STORAGE_KEYS = {
  PLANS: 'plans',
  TRAINERS: 'trainers',
  MEMBERS: 'members',
  WORKOUTS: 'workouts',
  ATTENDANCE: 'attendance',
  PAYMENTS: 'payments',
  MESSAGES: 'messages',
  BLOG: 'blog',
  SEEDED: 'triener_seeded',
};
