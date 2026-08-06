import type { DB, Client, Message, Announcement, Notification, WorkoutSession, MealEntry, WaterEntry, Payment, Coupon, Referral, Exercise, Recipe, AttendanceRecord, Assessment, ClientFile, Goal, Partner, Template, Course, Service } from './types'
import { PROGRAMS, PLANS, TESTIMONIALS, BLOG_POSTS, FAQS } from './constants'
import { addDays, todayKey } from './utils'
import { AVATARS, MEDIA } from './media'

const today = new Date()

export function buildSeed(): DB {
  const coachId = 'user_coach'
  const coachClientId = 'client_sarah'

  const clients: Client[] = [
    {
      id: coachClientId,
      userId: 'user_sarah',
      name: 'Sarah Johnson',
      email: 'sarah@demo.com',
      avatar: AVATARS.sarah,
      phone: '+1 555 111 2233',
      status: 'active',
      programId: 'p_weightloss',
      planId: 'pro',
      subscriptionEnds: addDays(today, 24).toISOString(),
      joinedAt: addDays(today, -47).toISOString(),
      streak: 6,
      lastActive: todayKey(),
      profile: {
        age: 29,
        gender: 'Female',
        heightCm: 168,
        weightKg: 74,
        targetWeightKg: 62,
        targetDate: addDays(today, 90).toISOString(),
        fitnessLevel: 'Beginner',
        goal: 'Weight Loss',
        medicalConditions: [],
        workoutExperience: 'Occasional gym, last 2 years off',
        trainingDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
        equipment: ['Dumbbells', 'Resistance bands', 'Treadmill'],
        foodPreferences: ['Chicken', 'Fish', 'Rice', 'Vegetables'],
        lifestyle: 'Office job, sleeps 7h, stress moderate',
      },
      progress: [
        { id: 'pr1', clientId: coachClientId, date: todayKey(addDays(today, -42)), weightKg: 82, bodyFat: 34 },
        { id: 'pr2', clientId: coachClientId, date: todayKey(addDays(today, -35)), weightKg: 80, bodyFat: 32.5 },
        { id: 'pr3', clientId: coachClientId, date: todayKey(addDays(today, -28)), weightKg: 78.4, bodyFat: 31 },
        { id: 'pr4', clientId: coachClientId, date: todayKey(addDays(today, -21)), weightKg: 77, bodyFat: 29.8 },
        { id: 'pr5', clientId: coachClientId, date: todayKey(addDays(today, -14)), weightKg: 75.6, bodyFat: 28.4 },
        { id: 'pr6', clientId: coachClientId, date: todayKey(addDays(today, -7)), weightKg: 74.8, bodyFat: 27.5 },
      ],
      achievements: ['First 5kg lost', '7-day streak', 'Perfect week'],
    },
    {
      id: 'client_david',
      userId: 'user_david',
      name: 'David Okafor',
      email: 'david@demo.com',
      avatar: AVATARS.david,
      status: 'active',
      programId: 'p_muscle',
      planId: 'pro',
      subscriptionEnds: addDays(today, 52).toISOString(),
      joinedAt: addDays(today, -82).toISOString(),
      streak: 12,
      lastActive: todayKey(),
      profile: {
        age: 31,
        gender: 'Male',
        heightCm: 183,
        weightKg: 78,
        targetWeightKg: 86,
        fitnessLevel: 'Intermediate',
        goal: 'Muscle Gain',
        medicalConditions: [],
        workoutExperience: '3 years gym experience',
        trainingDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
        equipment: ['Full gym'],
        foodPreferences: ['Beef', 'Rice', 'Eggs', 'Oats'],
        lifestyle: 'Hybrid worker, active',
      },
      progress: [
        { id: 'pd1', clientId: 'client_david', date: todayKey(addDays(today, -70)), weightKg: 71, bodyFat: 15 },
        { id: 'pd2', clientId: 'client_david', date: todayKey(addDays(today, -56)), weightKg: 73, bodyFat: 15.4 },
        { id: 'pd3', clientId: 'client_david', date: todayKey(addDays(today, -42)), weightKg: 74.6, bodyFat: 15.2 },
        { id: 'pd4', clientId: 'client_david', date: todayKey(addDays(today, -28)), weightKg: 76.2, bodyFat: 15.8 },
        { id: 'pd5', clientId: 'client_david', date: todayKey(addDays(today, -14)), weightKg: 77.3, bodyFat: 16.1 },
      ],
      achievements: ['First 5kg gained', '14-day streak', 'PR — 100kg bench'],
    },
  ]

  const workouts: WorkoutSession[] = [
    { id: 'w1', clientId: coachClientId, date: todayKey(addDays(today, -1)), name: 'Lower Body Power', status: 'completed', durationMin: 55, calories: 420, sets: [
      { exercise: 'Goblet Squat', sets: 4, reps: 10, weight: 20, completed: true },
      { exercise: 'Romanian Deadlift', sets: 4, reps: 12, weight: 16, completed: true },
      { exercise: 'Walking Lunges', sets: 3, reps: 14, weight: 8, completed: true },
      { exercise: 'Glute Bridge', sets: 3, reps: 15, weight: 0, completed: true },
    ]},
    { id: 'w2', clientId: coachClientId, date: todayKey(addDays(today, -3)), name: 'Upper Body Push', status: 'completed', durationMin: 48, calories: 360, sets: [
      { exercise: 'Push Ups', sets: 4, reps: 15, weight: 0, completed: true },
      { exercise: 'DB Shoulder Press', sets: 3, reps: 12, weight: 10, completed: true },
      { exercise: 'DB Chest Press', sets: 4, reps: 10, weight: 12, completed: true },
    ]},
    { id: 'w3', clientId: coachClientId, date: todayKey(addDays(today, -5)), name: 'Full Body Conditioning', status: 'completed', durationMin: 40, calories: 480, sets: [
      { exercise: 'Burpees', sets: 4, reps: 12, weight: 0, completed: true },
      { exercise: 'Kettlebell Swings', sets: 4, reps: 15, weight: 12, completed: true },
    ]},
  ]

  const meals: MealEntry[] = [
    { id: 'm1', clientId: coachClientId, date: todayKey(addDays(today, -1)), meal: 'Breakfast', name: 'Protein Oats with Berries', calories: 420, protein: 30, carbs: 52, fat: 11, completed: true },
    { id: 'm2', clientId: coachClientId, date: todayKey(addDays(today, -1)), meal: 'Lunch', name: 'Grilled Chicken Bowl', calories: 540, protein: 48, carbs: 42, fat: 18, completed: true },
    { id: 'm3', clientId: coachClientId, date: todayKey(addDays(today, -1)), meal: 'Dinner', name: 'Salmon & Quinoa', calories: 510, protein: 40, carbs: 45, fat: 16, completed: false },
    { id: 'm4', clientId: coachClientId, date: todayKey(addDays(today, -1)), meal: 'Snack', name: 'Greek Yogurt Parfait', calories: 290, protein: 26, carbs: 34, fat: 6, completed: true },
  ]

  const water: WaterEntry[] = [
    { id: 'wt1', clientId: coachClientId, date: todayKey(addDays(today, -1)), ml: 2100 },
    { id: 'wt2', clientId: coachClientId, date: todayKey(), ml: 1200 },
  ]

  const messages: Message[] = [
    { id: 'msg1', clientId: coachClientId, sender: 'coach', senderName: 'Coach Nati', text: 'Great session yesterday Sarah! Your squat depth has improved massively. Keep it up 🔥', createdAt: addDays(today, -1).toISOString(), read: true },
    { id: 'msg2', clientId: coachClientId, sender: 'client', senderName: 'Sarah Johnson', text: 'Thanks Coach! The new warm-up routine really helped my hips feel better.', createdAt: addDays(today, -1).toISOString(), read: true },
    { id: 'msg3', clientId: coachClientId, sender: 'coach', senderName: 'Coach Nati', text: 'Don’t forget your check-in tonight — send your morning weight and dinner photo 💪', createdAt: addDays(today, -0.2).toISOString(), read: false },
  ]

  const announcements: Announcement[] = [
    { id: 'a1', title: '💪 New 12-week Challenge starts Monday', body: 'Join the Summer Shred Challenge. Prizes for the top 3 transformations!', createdAt: addDays(today, -2).toISOString(), audience: 'all' },
    { id: 'a2', title: '🚨 Limited spots for July cohort', body: 'Only 3 spots left for 1:1 coaching this month. First come, first served.', createdAt: addDays(today, -5).toISOString(), audience: 'all' },
  ]

  const notifications: Notification[] = [
    { id: 'n1', clientId: coachClientId, title: 'Workout reminder', body: 'Lower Body Power is scheduled for today at 6:00 PM.', createdAt: addDays(today, -0.1).toISOString(), read: false },
    { id: 'n2', clientId: coachClientId, title: 'New message from Coach', body: 'Coach Nati sent you a message.', createdAt: addDays(today, -0.2).toISOString(), read: false },
  ]

  const payments: Payment[] = [
    { id: 'pay1', clientId: coachClientId, clientName: 'Sarah Johnson', amount: 149, plan: 'Pro', program: 'Weight Loss', method: 'Card', status: 'paid', createdAt: addDays(today, -24).toISOString(), reference: 'CN-2026-0001' },
    { id: 'pay2', clientId: 'client_david', clientName: 'David Okafor', amount: 149, plan: 'Pro', program: 'Muscle Gain', method: 'Card', status: 'paid', createdAt: addDays(today, -52).toISOString(), reference: 'CN-2026-0002' },
  ]

  const coupons: Coupon[] = [
    { id: 'cp1', code: 'SUMMER25', percentOff: 25, active: true, expiresAt: addDays(today, 40).toISOString() },
    { id: 'cp2', code: 'WELCOME10', percentOff: 10, active: true },
  ]

  const referrals: Referral[] = [
    { id: 'rf1', clientId: coachClientId, code: 'SARAH-FRIEND', signups: 2, reward: 60 },
  ]

  const exercises: Exercise[] = [
    { id: 'ex1', name: 'Goblet Squat', muscle: 'Legs · Glutes', equipment: 'Kettlebell', level: 'Beginner', instructions: ['Hold kettlebell at chest', 'Sit down into a deep squat', 'Drive through heels to stand'] },
    { id: 'ex2', name: 'Romanian Deadlift', muscle: 'Hamstrings · Glutes', equipment: 'Dumbbells', level: 'Intermediate', instructions: ['Hinge at hips with flat back', 'Lower weights to mid-shin', 'Squeeze glutes to return'] },
    { id: 'ex3', name: 'Bench Press', muscle: 'Chest · Triceps', equipment: 'Barbell', level: 'Intermediate', instructions: ['Set shoulders on the bench', 'Lower bar to mid-chest', 'Press up and slightly back'] },
    { id: 'ex4', name: 'Pull Up', muscle: 'Back · Biceps', equipment: 'Pull-up bar', level: 'Advanced', instructions: ['Hang with overhand grip', 'Pull chin over bar', 'Lower with control'] },
    { id: 'ex5', name: 'Push Up', muscle: 'Chest · Core', equipment: 'Bodyweight', level: 'Beginner', instructions: ['Plank position, hands wide', 'Lower chest to floor', 'Press back up'] },
    { id: 'ex6', name: 'Kettlebell Swing', muscle: 'Hips · Hamstrings', equipment: 'Kettlebell', level: 'Intermediate', instructions: ['Hinge and hike the bell back', 'Explosively swing to chest height', 'Let momentum lower it'] },
    { id: 'ex7', name: 'Deadlift', muscle: 'Posterior Chain', equipment: 'Barbell', level: 'Advanced', instructions: ['Feet under bar, grip just outside legs', 'Push floor away, bar stays close', 'Lock out at the top'] },
    { id: 'ex8', name: 'Walking Lunge', muscle: 'Quads · Glutes', equipment: 'Dumbbells', level: 'Beginner', instructions: ['Step forward into a deep lunge', 'Push off to bring back leg through', 'Alternate legs'] },
    { id: 'ex9', name: 'Shoulder Press', muscle: 'Shoulders · Triceps', equipment: 'Dumbbells', level: 'Intermediate', instructions: ['Sit or stand with weights at shoulder', 'Press overhead until arms lock', 'Lower with control'] },
    { id: 'ex10', name: 'Burpee', muscle: 'Full Body', equipment: 'Bodyweight', level: 'Advanced', instructions: ['Squat, kick feet back to plank', 'Do a push up', 'Jump feet forward and leap up'] },
    { id: 'ex11', name: 'Plank', muscle: 'Core', equipment: 'Bodyweight', level: 'Beginner', instructions: ['Forearms on floor, body straight', 'Brace abs and glutes', 'Hold for time'] },
    { id: 'ex12', name: 'Glute Bridge', muscle: 'Glutes · Hamstrings', equipment: 'Bodyweight', level: 'Beginner', instructions: ['Lie on back, knees bent', 'Drive hips up squeezing glutes', 'Lower and repeat'] },
  ]

  const recipes: Recipe[] = [
    { id: 'rc1', name: 'Protein Oats with Berries', category: 'Breakfast', calories: 420, protein: 30, carbs: 52, fat: 11, tags: ['High protein', 'Quick'], ingredients: ['Rolled oats', 'Protein powder', 'Mixed berries', 'Almond milk', 'Honey'] },
    { id: 'rc2', name: 'Greek Yogurt Parfait', category: 'Breakfast', calories: 290, protein: 26, carbs: 34, fat: 6, tags: ['High protein', 'No cook'], ingredients: ['Greek yogurt', 'Granola', 'Blueberries', 'Chia seeds'] },
    { id: 'rc3', name: 'Grilled Chicken Bowl', category: 'Lunch', calories: 540, protein: 48, carbs: 42, fat: 18, tags: ['Meal prep', 'High protein'], ingredients: ['Chicken breast', 'Brown rice', 'Broccoli', 'Olive oil', 'Lemon'] },
    { id: 'rc4', name: 'Salmon & Quinoa', category: 'Lunch', calories: 510, protein: 40, carbs: 45, fat: 16, tags: ['Omega-3', 'Gluten-free'], ingredients: ['Salmon fillet', 'Quinoa', 'Asparagus', 'Avocado'] },
    { id: 'rc5', name: 'Lean Beef Stir Fry', category: 'Dinner', calories: 560, protein: 45, carbs: 38, fat: 22, tags: ['High protein'], ingredients: ['Lean beef', 'Mixed peppers', 'Rice noodles', 'Soy sauce', 'Ginger'] },
    { id: 'rc6', name: 'Turkey Chili', category: 'Dinner', calories: 480, protein: 44, carbs: 30, fat: 14, tags: ['High fiber', 'Meal prep'], ingredients: ['Ground turkey', 'Kidney beans', 'Tomatoes', 'Onion', 'Chili powder'] },
    { id: 'rc7', name: 'PB Banana Shake', category: 'Shake', calories: 350, protein: 28, carbs: 44, fat: 12, tags: ['Post workout'], ingredients: ['Whey protein', 'Banana', 'Peanut butter', 'Oat milk', 'Ice'] },
    { id: 'rc8', name: 'Cottage Cheese Bowl', category: 'Snack', calories: 240, protein: 28, carbs: 18, fat: 7, tags: ['High protein', 'No cook'], ingredients: ['Cottage cheese', 'Pineapple', 'Almonds', 'Cinnamon'] },
  ]

  const attendance: AttendanceRecord[] = [
    { id: 'at1', clientId: coachClientId, date: todayKey(addDays(today, -6)), status: 'present', session: 'Full Body Conditioning' },
    { id: 'at2', clientId: coachClientId, date: todayKey(addDays(today, -4)), status: 'present', session: 'Upper Body Push' },
    { id: 'at3', clientId: coachClientId, date: todayKey(addDays(today, -2)), status: 'late', session: 'Lower Body Power' },
    { id: 'at4', clientId: 'client_david', date: todayKey(addDays(today, -5)), status: 'present', session: 'Chest & Triceps' },
    { id: 'at5', clientId: 'client_david', date: todayKey(addDays(today, -3)), status: 'present', session: 'Back & Biceps' },
    { id: 'at6', clientId: 'client_david', date: todayKey(addDays(today, -1)), status: 'absent', session: 'Leg Day' },
  ]

  const assessments: Assessment[] = [
    { id: 'as1', clientId: coachClientId, date: addDays(today, -42).toISOString(), type: 'Initial', bmi: 29.1, bodyFat: 34, score: 62, notes: 'Started program with moderate cardio base. Weak glute activation identified.', metrics: [{ label: 'Sit & reach', value: '18cm' }, { label: 'Push ups', value: '8' }, { label: 'Plank', value: '40s' }] },
    { id: 'as2', clientId: coachClientId, date: addDays(today, -7).toISOString(), type: 'Monthly Check-in', bmi: 26.5, bodyFat: 27.5, score: 81, notes: 'Great consistency. Squat depth improved, plank now 90s.', metrics: [{ label: 'Sit & reach', value: '24cm' }, { label: 'Push ups', value: '16' }, { label: 'Plank', value: '90s' }] },
    { id: 'as3', clientId: 'client_david', date: addDays(today, -14).toISOString(), type: 'Movement Screen', bmi: 23.3, bodyFat: 16.1, score: 88, notes: 'Strong patterns, minor shoulder imbalance on left side. Keep mobility work.', metrics: [{ label: 'Bench', value: '100kg' }, { label: 'Squat', value: '120kg' }, { label: 'Pull ups', value: '14' }] },
  ]

  const files: ClientFile[] = [
    { id: 'fl1', clientId: coachClientId, name: 'Summer-Shred-Program.pdf', kind: 'Program', size: '2.4 MB', uploadedAt: addDays(today, -40).toISOString() },
    { id: 'fl2', clientId: coachClientId, name: 'Meal-Plan-1800-cal.pdf', kind: 'Nutrition', size: '1.1 MB', uploadedAt: addDays(today, -40).toISOString() },
    { id: 'fl3', clientId: coachClientId, name: 'Progress-Report-Jun.pdf', kind: 'Progress Report', size: '840 KB', uploadedAt: addDays(today, -7).toISOString() },
    { id: 'fl4', clientId: 'client_david', name: 'Hypertrophy-Phase-2.pdf', kind: 'Program', size: '3.2 MB', uploadedAt: addDays(today, -60).toISOString() },
    { id: 'fl5', clientId: 'client_david', name: 'Coaching-Agreement.pdf', kind: 'Contract', size: '620 KB', uploadedAt: addDays(today, -82).toISOString() },
  ]

  const goals: Goal[] = [
    { id: 'g1', clientId: coachClientId, title: 'Lose 12kg', target: '82 → 70kg', deadline: addDays(today, 48).toISOString(), progress: 65, status: 'on-track' },
    { id: 'g2', clientId: coachClientId, title: 'Run 5km under 30min', target: 'Cardio benchmark', deadline: addDays(today, 30).toISOString(), progress: 50, status: 'at-risk' },
    { id: 'g3', clientId: coachClientId, title: 'Hold plank 2 minutes', target: 'Core strength', deadline: addDays(today, 21).toISOString(), progress: 75, status: 'on-track' },
    { id: 'g4', clientId: 'client_david', title: 'Gain 8kg muscle', target: '78 → 86kg', deadline: addDays(today, 90).toISOString(), progress: 48, status: 'on-track' },
    { id: 'g5', clientId: 'client_david', title: 'Bench 110kg', target: 'Strength PR', deadline: addDays(today, 45).toISOString(), progress: 91, status: 'achieved' },
  ]

  const partners: Partner[] = [
    { id: 'partner_nati', slug: 'coach-nati', name: 'Coach Nati', avatar: AVATARS.coach, cover: MEDIA.gym, role: 'Head Coach · Transformation Specialist', bio: 'Elite coach with 10+ years transforming bodies and minds. Certified CSCS, Precision Nutrition L2, and former competitive athlete. I build sustainable systems — not quick fixes.', specialties: ['Weight Loss', 'Muscle Gain', 'Strength', 'Nutrition'], experience: 10, clients: 500, programs: 12, rating: 4.9, location: 'Addis Ababa', verified: true },
    { id: 'partner_saron', slug: 'saron', name: 'Saron Tesfaye', avatar: MEDIA.womanFit, cover: MEDIA.yoga, role: 'Yoga & Mobility Coach', bio: 'Helping busy professionals move better, stress less, and build a body that feels as good as it looks through yoga and mobility.', specialties: ['Yoga', 'Mobility', 'Flexibility', 'Recovery'], experience: 7, clients: 210, programs: 6, rating: 4.8, location: 'Addis Ababa', verified: true },
    { id: 'partner_yosef', slug: 'yosef-aklilu', name: 'Yosef Aklilu', avatar: MEDIA.trainer, cover: MEDIA.boxing, role: 'Boxing & Conditioning Coach', bio: 'Former national boxing champion. I turn beginners into fighters and fighters into athletes with brutal, fun conditioning.', specialties: ['Boxing', 'HIIT', 'Cardio', 'Conditioning'], experience: 7, clients: 180, programs: 5, rating: 4.9, location: 'Addis Ababa', verified: true },
    { id: 'partner_biruktawit', slug: 'biruktawit-fikre', name: 'Biruktawit Fikre', avatar: MEDIA.womanFit2, cover: MEDIA.runWoman, role: 'Women\'s Fitness Coach', bio: 'Empowering women to become the strongest version of themselves. Pre/post-natal specialist and women\'s strength expert.', specialties: ['Women\'s Fitness', 'Pre-natal', 'Strength', 'Tone'], experience: 5, clients: 320, programs: 8, rating: 4.9, location: 'Addis Ababa', verified: true },
    { id: 'partner_hayder', slug: 'hayder-hairu', name: 'Hayder Hairu', avatar: MEDIA.deadlift, cover: MEDIA.barbell, role: 'Powerlifting Coach', bio: 'Strength is the foundation. I coach intermediate to advanced lifters to smash PRs safely and consistently.', specialties: ['Powerlifting', 'Strength', 'Muscle Mass'], experience: 11, clients: 140, programs: 4, rating: 4.8, location: 'Addis Ababa', verified: true },
    { id: 'partner_dagmawi', slug: 'dagmawi-ashenafi', name: 'Dagmawi Ashenafi', avatar: MEDIA.athlete, cover: MEDIA.plyo, role: 'Athletic Performance', bio: 'Sport-specific conditioning for competitive athletes. Speed, power, agility — built for game day.', specialties: ['Athletic Performance', 'Speed', 'Plyometrics', 'Agility'], experience: 6, clients: 95, programs: 5, rating: 4.7, location: 'Addis Ababa', verified: true },
  ]

  const templates: Template[] = [
    { id: 'tmp1', slug: 'fat-loss-workout', title: '12-Week Fat Loss Workout Plan', category: 'workout', image: MEDIA.runWoman, price: 2000, description: 'Progressive cardio + strength program designed to melt fat while keeping muscle.', items: 36, partnerSlug: 'coach-nati', rating: 4.9, downloads: 1240 },
    { id: 'tmp2', slug: 'muscle-building-split', title: 'Push/Pull/Legs Split Template', category: 'workout', image: MEDIA.deadlift, price: 2400, description: '6-day PPL optimized for hypertrophy with progressive overload built in.', items: 42, partnerSlug: 'coach-nati', rating: 4.8, downloads: 980 },
    { id: 'tmp3', slug: 'high-protein-meal-plan', title: 'High-Protein Meal Plan', category: 'meal-plan', image: MEDIA.mealPrep, price: 1600, description: '7-day meal plan hitting 180g protein daily with grocery list included.', items: 21, partnerSlug: 'biruktawit-fikre', rating: 4.9, downloads: 2100 },
    { id: 'tmp4', slug: 'beginner-fullbody', title: 'Beginner Full-Body Routine', category: 'workout', image: MEDIA.womanFit, price: 0, description: 'The perfect starting point. 3 days/week, zero equipment needed.', items: 18, partnerSlug: 'saron', rating: 4.7, downloads: 3400 },
    { id: 'tmp5', slug: 'macro-template', title: 'Macro & Calorie Tracker', category: 'nutrition', image: MEDIA.nutrition, price: 800, description: 'Spreadsheet template to track calories, macros, and weekly averages.', items: 1, partnerSlug: 'coach-nati', rating: 4.8, downloads: 1560 },
    { id: 'tmp6', slug: 'flexibility-flow', title: '30-Day Flexibility Flow', category: 'workout', image: MEDIA.yoga, price: 1200, description: 'Daily 15-minute mobility routine to eliminate stiffness and improve range.', items: 30, partnerSlug: 'saron', rating: 4.6, downloads: 870 },
  ]

  const courses: Course[] = [
    { id: 'crs1', slug: 'fat-loss-masterclass', title: 'Fat Loss Masterclass', image: MEDIA.runWoman, price: 6000, compareAt: 8000, description: 'The complete science of fat loss — training, nutrition, mindset, and sustainability.', lessons: 24, hours: 8, level: 'All levels', partnerSlug: 'coach-nati', rating: 4.9, students: 1840, badge: 'Best Seller' },
    { id: 'crs2', slug: 'muscle-building-blueprint', title: 'Muscle Building Blueprint', image: MEDIA.barbell, price: 7200, description: 'Everything you need to build your best physique — programming, nutrition, recovery.', lessons: 32, hours: 12, level: 'Intermediate', partnerSlug: 'coach-nati', rating: 4.8, students: 1220 },
    { id: 'crs3', slug: 'yoga-foundations', title: 'Yoga Foundations', image: MEDIA.yoga, price: 4000, description: 'Build a sustainable yoga practice from scratch. Flexibility, strength, and calm.', lessons: 20, hours: 6, level: 'Beginner', partnerSlug: 'saron', rating: 4.9, students: 2100, badge: 'Popular' },
    { id: 'crs4', title: 'Boxing Conditioning', slug: 'boxing-conditioning', image: MEDIA.boxing, price: 5200, description: 'Train like a fighter. Cardio, power, footwork — no sparring required.', lessons: 16, hours: 5, level: 'All levels', partnerSlug: 'yosef-aklilu', rating: 4.8, students: 890 },
    { id: 'crs5', slug: 'womens-strength', title: 'Women\'s Strength 101', image: MEDIA.womanFit2, price: 4800, description: 'Confidently step into the weight room. Form, programming, and progressive overload.', lessons: 18, hours: 7, level: 'Beginner', partnerSlug: 'biruktawit-fikre', rating: 4.9, students: 1560 },
    { id: 'crs6', slug: 'powerlifting-101', title: 'Powerlifting 101', image: MEDIA.deadlift, price: 6400, description: 'Master squat, bench, and deadlift. Build a 300kg+ total safely.', lessons: 28, hours: 10, level: 'Intermediate', partnerSlug: 'hayder-hairu', rating: 4.7, students: 640 },
  ]

  const services: Service[] = [
    { id: 'svc1', title: '1:1 Personal Training', icon: 'Dumbbell', description: 'In-person sessions engineered around your body, your schedule, and your goals.', features: ['Custom programming', 'Form coaching', 'Nutrition guidance', 'Weekly check-ins'] },
    { id: 'svc2', title: 'Online Coaching', icon: 'MonitorPlay', description: 'Full remote coaching with daily support, video feedback, and a personal dashboard.', features: ['App dashboard', 'Daily messaging', 'Video form reviews', 'Weekly adjustments'] },
    { id: 'svc3', title: 'Custom Meal Plans', icon: 'Apple', description: 'Flexible macro-based nutrition built on whole foods you actually enjoy.', features: ['Macro calculations', 'Grocery lists', 'Recipe library', 'Weekly updates'] },
    { id: 'svc4', title: 'Fitness Assessment', icon: 'Activity', description: 'Deep body composition, movement, and mobility analysis to build your baseline.', features: ['Body composition', 'Movement screen', 'Blood work review', 'Goal mapping'] },
    { id: 'svc5', title: 'Lifestyle Coaching', icon: 'HeartPulse', description: 'Sleep, stress, and habit systems that make your transformation permanent.', features: ['Sleep optimization', 'Stress management', 'Habit building', 'Accountability'] },
    { id: 'svc6', title: 'Group Training', icon: 'Users', description: 'Small group sessions for motivation, community, and serious results.', features: ['Max 8 people', 'Scalable workouts', 'Team challenges', 'Community'] },
  ]

  return {
    users: [
      { id: coachId, name: 'Coach Nati', email: 'admin@coachnati.com', password: 'admin123', role: 'admin', avatar: AVATARS.coach, createdAt: addDays(today, -400).toISOString() },
      { id: 'user_sarah', name: 'Sarah Johnson', email: 'sarah@demo.com', password: 'demo123', role: 'client', avatar: AVATARS.sarah, createdAt: addDays(today, -47).toISOString() },
      { id: 'user_david', name: 'David Okafor', email: 'david@demo.com', password: 'demo123', role: 'client', avatar: AVATARS.david, createdAt: addDays(today, -82).toISOString() },
    ],
    clients,
    programs: PROGRAMS,
    plans: PLANS,
    testimonials: TESTIMONIALS,
    blogPosts: BLOG_POSTS,
    faqs: FAQS,
    coupons,
    payments,
    referrals,
    messages,
    announcements,
    notifications,
    workouts,
    meals,
    water,
    appointments: [],
    subscribers: [],
    leads: [],
    exercises,
    recipes,
    attendance,
    assessments,
    files,
    goals,
    partners,
    templates,
    courses,
    services,
  }
}
