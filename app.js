/* ==========================================================================
   Triener Gym Management System - Application Engine (app.js)
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. Initial Seed Data (Simulating a database)
// --------------------------------------------------------------------------
const DEFAULT_PLANS = [
    { id: 'plan-basic', name: 'Basic Tier', price: 29, duration: 'month', features: ['Gym Floor Access', 'Basic Locker Room', '1 Fitness Assessment', 'Free Wi-Fi'], disabled: ['Group Classes', 'Personal Trainer', 'Spa & Sauna'] },
    { id: 'plan-premium', name: 'Elite Performance', price: 59, duration: 'month', features: ['All Gym Access', 'Premium Locker & Sauna', 'Unlimited Group Classes', 'Monthly Trainer Consultation', 'Free Wi-Fi'], disabled: ['Private VIP Lounge'] },
    { id: 'plan-vip', name: 'VIP Ultimate', price: 99, duration: 'month', features: ['24/7 Access All Locations', 'Private VIP Lounge & Spa', 'Unlimited Classes', 'Dedicated Personal Trainer', 'Free Nutrition Consultation', 'Complimentary Gym Apparel'], disabled: [] }
];

const DEFAULT_TRAINERS = [
    { id: 'trainer-alex', name: 'Coach Alex Rivera', role: 'Strength & Conditioning Specialist', bio: 'Former competitive powerlifter with 10+ years coaching experience. Focuses on biomechanics, compound lifts, and progressive overload.', photo: '🏋️‍♂️' },
    { id: 'trainer-sarah', name: 'Coach Sarah Jenkins', role: 'Cardio & HIIT Coordinator', bio: 'Certified athletics trainer specializing in explosive agility, fat loss, and metabolic conditioning. Loves group coaching and upbeat energy.', photo: '🏃‍♀️' },
    { id: 'trainer-marcus', name: 'Coach Marcus Chen', role: 'Yoga & Flexibility Instructor', bio: 'Brings a mindful approach to fitness. Focuses on core stabilization, posture corrections, flexibility training, and injury rehabilitation.', photo: '🧘‍♂️' }
];

const DEFAULT_MEMBERS = [
    { id: 'member-john', name: 'John Doe', email: 'john@example.com', password: 'password', phone: '+1 (555) 123-4567', planId: 'plan-premium', trainerId: 'trainer-alex', status: 'active', startDate: '2026-01-10', expiryDate: '2026-09-10', barcode: 'TRN-1082-99', bio: 'Determined to build muscle mass and improve general conditioning.' },
    { id: 'member-jane', name: 'Jane Smith', email: 'jane@example.com', password: 'password', phone: '+1 (555) 987-6543', planId: 'plan-vip', trainerId: 'trainer-sarah', status: 'active', startDate: '2026-02-15', expiryDate: '2027-02-15', barcode: 'TRN-2309-88', bio: 'Training for a local half-marathon and working on posture.' },
    { id: 'member-bob', name: 'Bob Johnson', email: 'bob@example.com', password: 'password', phone: '+1 (555) 456-7890', planId: 'plan-basic', trainerId: '', status: 'expired', startDate: '2025-05-01', expiryDate: '2026-05-01', barcode: 'TRN-8742-12', bio: 'Recreation user. Enjoys standard cardio machines.' }
];

const DEFAULT_WORKOUTS = [
    {
        memberId: 'member-john',
        days: [
            {
                day: 'Day 1: Upper Body Push',
                exercises: [
                    { name: 'Barbell Bench Press', sets: 4, reps: 8, weight: 185 },
                    { name: 'Overhead Press', sets: 3, reps: 10, weight: 115 },
                    { name: 'Dumbbell Incline Flyes', sets: 3, reps: 12, weight: 45 },
                    { name: 'Tricep Rope Pushdowns', sets: 4, reps: 15, weight: 60 }
                ]
            },
            {
                day: 'Day 2: Lower Body Strength',
                exercises: [
                    { name: 'Barbell Back Squat', sets: 4, reps: 6, weight: 225 },
                    { name: 'Romanian Deadlifts', sets: 3, reps: 10, weight: 185 },
                    { name: 'Leg Extensions', sets: 3, reps: 12, weight: 110 },
                    { name: 'Standing Calf Raises', sets: 4, reps: 15, weight: 150 }
                ]
            }
        ]
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
                    { name: 'Plank Holds', sets: 3, reps: '60 secs', weight: 'BW' }
                ]
            }
        ]
    }
];

const DEFAULT_ATTENDANCE = [
    { id: 'att-1', memberId: 'member-john', date: '2026-08-01', time: '08:14 AM' },
    { id: 'att-2', memberId: 'member-john', date: '2026-08-03', time: '08:05 AM' },
    { id: 'att-3', memberId: 'member-john', date: '2026-08-04', time: '08:21 AM' },
    { id: 'att-4', memberId: 'member-jane', date: '2026-08-02', time: '06:30 PM' },
    { id: 'att-5', memberId: 'member-jane', date: '2026-08-04', time: '07:15 PM' },
    { id: 'att-6', memberId: 'member-bob', date: '2026-04-20', time: '02:00 PM' }
];

const DEFAULT_PAYMENTS = [
    { id: 'inv-101', memberId: 'member-john', amount: 59, status: 'paid', date: '2026-07-10', method: 'Visa ending 4242' },
    { id: 'inv-102', memberId: 'member-john', amount: 59, status: 'paid', date: '2026-08-10', method: 'Visa ending 4242' },
    { id: 'inv-103', memberId: 'member-jane', amount: 99, status: 'paid', date: '2026-07-15', method: 'MasterCard ending 9012' },
    { id: 'inv-104', memberId: 'member-bob', amount: 29, status: 'paid', date: '2026-04-01', method: 'PayPal' }
];

const DEFAULT_MESSAGES = [
    { from: 'trainer-alex', to: 'member-john', timestamp: '2026-08-04 10:15 AM', content: 'Hey John, how did that push workout feel yesterday? Make sure you focus on progressive overload.' },
    { from: 'member-john', to: 'trainer-alex', timestamp: '2026-08-04 11:30 AM', content: 'Hey coach! Felt really good. I managed to bench 185lbs for all 4 sets of 8 reps! Triceps are definitely sore today.' },
    { from: 'trainer-alex', to: 'member-john', timestamp: '2026-08-04 11:45 AM', content: 'Excellent work! Next week we will add 5 lbs to the bench or aim for 9 reps. Keep it up.' }
];

const DEFAULT_BLOG = [
    { id: 'blog-1', title: 'Top 5 Progressive Overload Techniques', author: 'Coach Alex Rivera', date: 'August 1, 2026', summary: 'Unlock plateaus by applying these simple strategies to elevate your strength gains.', content: 'Progressive overload is the foundation of muscle hypertrophy and strength building. To keep making progress, you must challenge your muscles. Here are five simple techniques you can use:\n\n1. Increase the Load: Add weight to the bar.\n2. Increase Volume: Perform more reps or sets.\n3. Alter Tempo: Focus on a slower eccentric (lowering) phase.\n4. Reduce Rest Intervals: Push through with less rest between sets.\n5. Improve Form: Execute exercises with cleaner biomechanics.\n\nExperiment with these one at a time to prevent overtraining!' },
    { id: 'blog-2', title: 'Hydration and Athletic Endurance', author: 'Coach Sarah Jenkins', date: 'July 24, 2026', summary: 'Why dehydration ruins your workout and how to structure your daily fluid intake.', content: 'Even mild dehydration—losing just 2% of your body water weight—can reduce athletic performance by up to 20%. Dehydration limits blood volume, placing extra stress on the cardiovascular system and making high-intensity exercise feel significantly harder.\n\nStructure your hydration strategy:\n- 2 Hours Before: Drink 17-20 oz of water.\n- During Workout: Sip 7-10 oz every 15-20 minutes.\n- Post Workout: Rehydrate with water and electrolytes based on intensity. Keep active and stay hydrated!' }
];

// --------------------------------------------------------------------------
// 2. Application State Manager
// --------------------------------------------------------------------------
class StateManager {
    constructor() {
        this.initDatabase();
        
        // Dynamic Current Session Context
        this.currentRole = 'public'; // 'public', 'member', 'trainer', 'admin'
        this.currentUser = null;      // Holds active object from database
        this.currentView = 'home';    // Holds context path (e.g. 'home', 'dashboard', 'workouts')
    }

    initDatabase() {
        if (!localStorage.getItem('triener_seeded')) {
            localStorage.setItem('plans', JSON.stringify(DEFAULT_PLANS));
            localStorage.setItem('trainers', JSON.stringify(DEFAULT_TRAINERS));
            localStorage.setItem('members', JSON.stringify(DEFAULT_MEMBERS));
            localStorage.setItem('workouts', JSON.stringify(DEFAULT_WORKOUTS));
            localStorage.setItem('attendance', JSON.stringify(DEFAULT_ATTENDANCE));
            localStorage.setItem('payments', JSON.stringify(DEFAULT_PAYMENTS));
            localStorage.setItem('messages', JSON.stringify(DEFAULT_MESSAGES));
            localStorage.setItem('blog', JSON.stringify(DEFAULT_BLOG));
            localStorage.setItem('triener_seeded', 'true');
        }
    }

    // Generic DB Helpers
    getData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Role switcher logic
    setRole(role, userId = null) {
        this.currentRole = role;
        const members = this.getData('members');
        const trainers = this.getData('trainers');
        
        if (role === 'member') {
            this.currentUser = userId ? members.find(m => m.id === userId) : members[0];
            this.currentView = 'dashboard';
        } else if (role === 'trainer') {
            this.currentUser = userId ? trainers.find(t => t.id === userId) : trainers[0];
            this.currentView = 'dashboard';
        } else if (role === 'admin') {
            this.currentUser = { name: 'System Administrator', role: 'admin' };
            this.currentView = 'dashboard';
        } else {
            this.currentUser = null;
            this.currentView = 'home';
        }
        
        document.body.classList.toggle('portal-active', role !== 'public');
        
        // Dispatch custom event to trigger render update
        window.dispatchEvent(new CustomEvent('statechanged'));
    }
}

const state = new StateManager();

// --------------------------------------------------------------------------
// 3. Main Router & Navigation Logic
// --------------------------------------------------------------------------
function navigate(view) {
    state.currentView = view;
    renderApp();
}

function renderApp() {
    const mainHeader = document.getElementById('mainHeader');
    const mainFooter = document.getElementById('mainFooter');
    const appRoot = document.getElementById('appRoot');
    
    // Add fade out
    appRoot.classList.add('fade-out');
    
    setTimeout(() => {
        // Toggle footer based on portal views
        if (state.currentRole === 'public') {
            mainFooter.style.display = 'block';
        } else {
            mainFooter.style.display = 'none'; // Portal views hide standard marketing footer
        }

        renderHeader();
        
        // Render view content based on role and view path
        if (state.currentRole === 'public') {
            renderPublicView();
        } else if (state.currentRole === 'member') {
            renderMemberView();
        } else if (state.currentRole === 'trainer') {
            renderTrainerView();
        } else if (state.currentRole === 'admin') {
            renderAdminView();
        }
        
        appRoot.classList.remove('fade-out');
    }, 150);
}

// Render dynamic nav links and actions
function renderHeader() {
    const mainNav = document.getElementById('mainNav');
    const navActions = document.getElementById('navActions');
    
    mainNav.innerHTML = '';
    navActions.innerHTML = '';
    
    if (state.currentRole === 'public') {
        const publicLinks = [
            { text: 'Home', view: 'home' },
            { text: 'About', view: 'about' },
            { text: 'Memberships', view: 'memberships' },
            { text: 'Trainers', view: 'trainers' },
            { text: 'FAQ', view: 'faq' },
            { text: 'Gallery', view: 'gallery' },
            { text: 'Blog', view: 'blog' },
            { text: 'Contact', view: 'contact' }
        ];
        
        publicLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = '#';
            a.className = `nav-link ${state.currentView === link.view ? 'active' : ''}`;
            a.textContent = link.text;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                navigate(link.view);
            });
            mainNav.appendChild(a);
        });
        
        navActions.innerHTML = `<button class="btn btn-primary btn-sm" id="navLoginBtn">Portal Login</button>`;
        document.getElementById('navLoginBtn').addEventListener('click', () => {
            showLoginModal();
        });
        
    } else {
        // Portal navigation header
        const logoText = state.currentRole.toUpperCase() + ' PORTAL';
        mainNav.innerHTML = `<span class="portal-header-tag">${logoText} - Welcome, ${state.currentUser.name}</span>`;
        
        navActions.innerHTML = `
            <button class="btn btn-secondary btn-sm" id="logoutBtn">Logout</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            state.setRole('public');
            showToast('Logged out successfully', 'info');
        });
    }
}

// --------------------------------------------------------------------------
// 4. Notification Toast Utilities
// --------------------------------------------------------------------------
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '🔔';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'info') icon = 'ℹ️';
    
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    
    // Automatically remove toast after animations complete
    setTimeout(() => {
        toast.remove();
    }, 3300);
}

// --------------------------------------------------------------------------
// 5. Modal Controllers
// --------------------------------------------------------------------------
const modalBackdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function openModal(contentHtml) {
    modalContent.innerHTML = contentHtml;
    modalBackdrop.style.display = 'flex';
}

function closeModal() {
    modalBackdrop.style.display = 'none';
    modalContent.innerHTML = '';
}

modalCloseBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
});

// Show Login / Registration Modal
function showLoginModal() {
    const html = `
        <div class="login-modal-wrapper">
            <h2 style="margin-bottom: 24px; text-align: center;">Portal Login</h2>
            <form id="portalLoginForm">
                <div class="form-group">
                    <label for="loginEmail">Email Address</label>
                    <input type="email" id="loginEmail" class="form-control" placeholder="member@example.com, or admin@triener.com" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" class="form-control" value="password" required>
                </div>
                <div class="form-group" style="margin-bottom: 30px;">
                    <label for="loginRole">Select Portal Role</label>
                    <select id="loginRole" class="form-control">
                        <option value="member">Member Portal</option>
                        <option value="trainer">Trainer Portal</option>
                        <option value="admin">Admin Portal</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Sign In</button>
            </form>
            <div style="margin-top: 20px; text-align: center; font-size: 0.9rem; color: var(--text-muted);">
                Don't have an account? <a href="#" id="modalRegisterLink" style="color: var(--primary); font-weight: 600;">Register as a Member</a>
            </div>
        </div>
    `;
    openModal(html);
    
    document.getElementById('portalLoginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const role = document.getElementById('loginRole').value;
        
        if (role === 'admin') {
            if (email.includes('admin') || email === 'admin@triener.com') {
                state.setRole('admin');
                closeModal();
                showToast('Welcome, Administrator!', 'success');
            } else {
                showToast('Invalid administrator credentials', 'error');
            }
            return;
        }
        
        if (role === 'trainer') {
            const trainers = state.getData('trainers');
            const trainer = trainers.find(t => t.name.toLowerCase().includes(email.split('@')[0]) || t.id === 'trainer-alex');
            state.setRole('trainer', trainer.id);
            closeModal();
            showToast(`Welcome back, ${trainer.name}!`, 'success');
            return;
        }
        
        if (role === 'member') {
            const members = state.getData('members');
            const member = members.find(m => m.email === email) || members[0];
            state.setRole('member', member.id);
            closeModal();
            showToast(`Hello ${member.name}, welcome to your portal!`, 'success');
        }
    });
    
    document.getElementById('modalRegisterLink').addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterModal();
    });
}

function showRegisterModal() {
    const plans = state.getData('plans');
    const plansOptions = plans.map(p => `<option value="${p.id}">${p.name} - $${p.price}/${p.duration}</option>`).join('');
    
    const html = `
        <div class="register-modal-wrapper">
            <h2 style="margin-bottom: 24px; text-align: center;">Join Triener Fitness</h2>
            <form id="portalRegisterForm">
                <div class="form-group">
                    <label for="regName">Full Name</label>
                    <input type="text" id="regName" class="form-control" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label for="regEmail">Email Address</label>
                    <input type="email" id="regEmail" class="form-control" placeholder="john@example.com" required>
                </div>
                <div class="form-group">
                    <label for="regPhone">Phone Number</label>
                    <input type="tel" id="regPhone" class="form-control" placeholder="+1 (555) 000-0000" required>
                </div>
                <div class="form-group">
                    <label for="regPlan">Choose Plan</label>
                    <select id="regPlan" class="form-control">
                        ${plansOptions}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Register & Subscribe</button>
            </form>
            <div style="margin-top: 20px; text-align: center; font-size: 0.9rem; color: var(--text-muted);">
                Already have an account? <a href="#" id="modalLoginLink" style="color: var(--primary); font-weight: 600;">Sign In</a>
            </div>
        </div>
    `;
    openModal(html);
    
    document.getElementById('portalRegisterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const members = state.getData('members');
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        const planId = document.getElementById('regPlan').value;
        
        const newMember = {
            id: `member-${Date.now()}`,
            name,
            email,
            password: 'password',
            phone,
            planId,
            trainerId: '',
            status: 'active',
            startDate: new Date().toISOString().split('T')[0],
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
            barcode: `TRN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
            bio: 'New member.'
        };
        
        members.push(newMember);
        state.saveData('members', members);
        
        // Log a payment receipt
        const payments = state.getData('payments');
        const plan = state.getData('plans').find(p => p.id === planId);
        payments.push({
            id: `inv-${Math.floor(200 + Math.random() * 1000)}`,
            memberId: newMember.id,
            amount: plan.price,
            status: 'paid',
            date: newMember.startDate,
            method: 'Visa Credit Card'
        });
        state.saveData('payments', payments);
        
        state.setRole('member', newMember.id);
        closeModal();
        showToast('Registration successful! Welcome!', 'success');
    });
    
    document.getElementById('modalLoginLink').addEventListener('click', (e) => {
        e.preventDefault();
        showLoginModal();
    });
}

// --------------------------------------------------------------------------
// 6. View Rendering Functions: Public Website
// --------------------------------------------------------------------------
function renderPublicView() {
    const appRoot = document.getElementById('appRoot');
    
    if (state.currentView === 'home') {
        const plans = state.getData('plans');
        const trainers = state.getData('trainers');
        
        let planCards = plans.map((plan, idx) => `
            <div class="glass-card plan-card ${idx === 1 ? 'popular' : ''}">
                ${idx === 1 ? '<div class="popular-tag">Popular choice</div>' : ''}
                <div>
                    <div class="plan-header">
                        <h3 class="plan-name">${plan.name}</h3>
                        <div class="plan-price">$${plan.price}<span>/${plan.duration}</span></div>
                    </div>
                    <ul class="plan-features">
                        ${plan.features.map(f => `<li><span class="plan-feature-bullet"></span>${f}</li>`).join('')}
                        ${plan.disabled.map(f => `<li class="disabled"><span class="plan-feature-bullet"></span>${f}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn ${idx === 1 ? 'btn-primary' : 'btn-secondary'} select-plan-btn" data-id="${plan.id}" style="width: 100%;">Select Plan</button>
            </div>
        `).join('');

        let trainerCards = trainers.slice(0, 3).map(trainer => `
            <div class="glass-card trainer-card">
                <div class="trainer-photo-mock">
                    ${trainer.photo}
                    <span class="trainer-overlay-info">Active Trainer</span>
                </div>
                <div class="trainer-info">
                    <h3 class="trainer-name">${trainer.name}</h3>
                    <div class="trainer-role">${trainer.role}</div>
                    <p class="trainer-bio">${trainer.bio}</p>
                </div>
            </div>
        `).join('');

        appRoot.innerHTML = `
            <!-- Hero -->
            <section class="hero-section">
                <div class="container hero-grid">
                    <div class="hero-text">
                        <h1>Unlock Your <br><span>Ultimate Strength</span></h1>
                        <p>Track workouts, consult elite trainers, and manage memberships seamlessly. Triener connects performance with modern intelligence.</p>
                        <div class="hero-actions">
                            <button class="btn btn-primary" id="heroStartBtn">Get Started</button>
                            <button class="btn btn-secondary" id="heroTourBtn">Explore Plans</button>
                        </div>
                    </div>
                    <div class="hero-img-container">
                        <div class="hero-visual-card">
                            <div class="hero-stat-badge hero-stat-badge-1">
                                <span style="font-size: 1.5rem;">🔥</span>
                                <div>
                                    <div style="font-weight: 700; font-size: 0.95rem;">420 kcal</div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted);">Active Burn</div>
                                </div>
                            </div>
                            <div class="hero-circle-svg">
                                <div class="hero-inner-circle">
                                    <h3>3,840</h3>
                                    <span>Active Trieners Today</span>
                                </div>
                            </div>
                            <div class="hero-stat-badge hero-stat-badge-2">
                                <span style="font-size: 1.5rem;">💪</span>
                                <div>
                                    <div style="font-weight: 700; font-size: 0.95rem;">12.4 Tons</div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted);">Total Lifted Today</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Service Board -->
            <section class="container" style="padding: 80px 0;">
                <div class="section-header">
                    <h2>Where Fitness Meets Systems</h2>
                    <p>We empower coaches, fitness influencers and gyms with digital products, SaaS tools, and scientific consultancy, so fitness works smarter, not harder.</p>
                </div>
                <div class="features-grid">
                    <div class="glass-card feature-card">
                        <div class="feature-icon">📈</div>
                        <h3>Coaching Business & Social Growth</h3>
                        <p>We help fitness professionals launch independent businesses and scale their personal brands through end-to-end social media management, strategic content creation, and optimized online coaching systems.</p>
                    </div>
                    <div class="glass-card feature-card">
                        <div class="feature-icon">⚙️</div>
                        <h3>Fitness Software & Automation</h3>
                        <p>Smart tools that generate structured, science-based training and diet plans efficiently—built to scale coaching with consistency and control.</p>
                    </div>
                    <div class="glass-card feature-card">
                        <div class="feature-icon">🧠</div>
                        <h3>Gym & Coach Consultancy</h3>
                        <p>Science-based coach education, internal systems, and social media strategy designed to modernize gyms and fitness businesses.</p>
                    </div>
                </div>
            </section>

            <!-- Memberships preview -->
            <section class="container" style="padding: 80px 0;">
                <div class="section-header">
                    <h2>Membership Plans</h2>
                    <p>Transparent tiers designed to fit casual gym enthusiasts and elite competitive powerlifters alike.</p>
                </div>
                <div class="plans-grid">
                    ${planCards}
                </div>
            </section>

            <!-- Trainers preview -->
            <section class="container" style="padding: 80px 0;">
                <div class="section-header">
                    <h2>Our Elite Coaching Staff</h2>
                    <p>Learn from certified, championship-winning professionals dedicated to structural safety and performance.</p>
                </div>
                <div class="trainers-grid">
                    ${trainerCards}
                </div>
            </section>
        `;
        
        // Event listeners
        document.getElementById('heroStartBtn').addEventListener('click', showRegisterModal);
        document.getElementById('heroTourBtn').addEventListener('click', () => navigate('memberships'));
        document.querySelectorAll('.select-plan-btn').forEach(btn => {
            btn.addEventListener('click', showRegisterModal);
        });

    } else if (state.currentView === 'about') {
        appRoot.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>About Triener</h2>
                    <p>Pioneering the future of physical and digital physical conditioning.</p>
                </div>
                <div class="about-grid">
                    <div class="glass-card" style="padding: 40px;">
                        <h3>Established in 2026</h3>
                        <p style="margin-bottom: 20px;">Triener was founded on a simple premise: physical training should not be disconnected from digital metrics. We provide state-of-the-art weights, platforms, and machines integrated with an intelligent portal platform where coach modifications propagate instantly.</p>
                        <p>We boast over 40,000 sq ft of space including dedicated powerlifting platforms, high-intensity aerobic areas, and a recovery spa.</p>
                        
                        <div class="about-features">
                            <div class="about-feature-item">
                                <span class="about-feature-check">✓</span>
                                <div><strong>Olympic Lifters Paradise</strong>: 12 Eleiko barbell stations.</div>
                            </div>
                            <div class="about-feature-item">
                                <span class="about-feature-check">✓</span>
                                <div><strong>Integrated Portal Coaching</strong>: Real-time workout delivery.</div>
                            </div>
                            <div class="about-feature-item">
                                <span class="about-feature-check">✓</span>
                                <div><strong>Recovery Suite</strong>: Cryotherapy chambers and dry saunas.</div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <div class="glass-card" style="text-align: center; padding: 30px;">
                            <h4 style="font-size: 3rem; color: var(--primary);">24/7</h4>
                            <p style="color: var(--text-muted);">Facility Access for Elite & VIP Members</p>
                        </div>
                        <div class="glass-card" style="text-align: center; padding: 30px;">
                            <h4 style="font-size: 3rem; color: var(--info);">15+</h4>
                            <p style="color: var(--text-muted);">Certified Specialized Fitness Trainers</p>
                        </div>
                        <div class="glass-card" style="text-align: center; padding: 30px;">
                            <h4 style="font-size: 3rem; color: var(--success);">99%</h4>
                            <p style="color: var(--text-muted);">Client Goal Achievement Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (state.currentView === 'memberships') {
        const plans = state.getData('plans');
        let planCards = plans.map((plan, idx) => `
            <div class="glass-card plan-card ${idx === 1 ? 'popular' : ''}">
                ${idx === 1 ? '<div class="popular-tag">Popular choice</div>' : ''}
                <div>
                    <div class="plan-header">
                        <h3 class="plan-name">${plan.name}</h3>
                        <div class="plan-price">$${plan.price}<span>/${plan.duration}</span></div>
                    </div>
                    <ul class="plan-features">
                        ${plan.features.map(f => `<li><span class="plan-feature-bullet"></span>${f}</li>`).join('')}
                        ${plan.disabled.map(f => `<li class="disabled"><span class="plan-feature-bullet"></span>${f}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn ${idx === 1 ? 'btn-primary' : 'btn-secondary'} select-plan-btn" data-id="${plan.id}" style="width: 100%;">Subscribe Now</button>
            </div>
        `).join('');

        appRoot.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Select Your Membership Level</h2>
                    <p>Simple pricing with no hidden enrollment charges. Upgrade or downgrade at any time.</p>
                </div>
                <div class="plans-grid">
                    ${planCards}
                </div>
            </div>
        `;
        document.querySelectorAll('.select-plan-btn').forEach(btn => {
            btn.addEventListener('click', showRegisterModal);
        });
    } else if (state.currentView === 'trainers') {
        const trainers = state.getData('trainers');
        let trainerCards = trainers.map(trainer => `
            <div class="glass-card trainer-card">
                <div class="trainer-photo-mock">
                    ${trainer.photo}
                </div>
                <div class="trainer-info">
                    <h3 class="trainer-name">${trainer.name}</h3>
                    <div class="trainer-role">${trainer.role}</div>
                    <p class="trainer-bio">${trainer.bio}</p>
                </div>
            </div>
        `).join('');

        appRoot.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Our Dedicated Fitness Coaches</h2>
                    <p>Work 1-on-1 with experts to optimize nutrition, lifting mechanics, and metabolic conditioning.</p>
                </div>
                <div class="trainers-grid">
                    ${trainerCards}
                </div>
            </div>
        `;
    } else if (state.currentView === 'gallery') {
        appRoot.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Triener Photo Gallery</h2>
                    <p>Step inside our world-class athletic facilities.</p>
                </div>
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <span class="gallery-placeholder-icon">🏋️‍♂️</span>
                        <div class="gallery-overlay">
                            <h4>Free Weights Section</h4>
                            <p>Olympic lifting bars, dumbbells up to 150 lbs, and full power cages.</p>
                        </div>
                    </div>
                    <div class="gallery-item">
                        <span class="gallery-placeholder-icon">🧘‍♀️</span>
                        <div class="gallery-overlay">
                            <h4>Yoga & Pilates Studio</h4>
                            <p>Temperature-controlled studio with state of the art sound and lighting.</p>
                        </div>
                    </div>
                    <div class="gallery-item">
                        <span class="gallery-placeholder-icon">🏃‍♂️</span>
                        <div class="gallery-overlay">
                            <h4>Cardio Balcony</h4>
                            <p>High-end treadmills, curved self-powered runners, and rowing machines.</p>
                        </div>
                    </div>
                    <div class="gallery-item">
                        <span class="gallery-placeholder-icon">💦</span>
                        <div class="gallery-overlay">
                            <h4>Sauna & Spa Suite</h4>
                            <p>Unwind after intense sessions inside our dry infrared saunas.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (state.currentView === 'faq') {
        appRoot.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Frequently Asked Questions</h2>
                    <p>Have questions about plans, access, or trainers? Check out our quick answers below.</p>
                </div>
                <div class="faq-list">
                    <div class="faq-item">
                        <button class="faq-question">How does portal personal training work? <span class="faq-icon">+</span></button>
                        <div class="faq-answer">
                            When you join under Elite or VIP plans, you are assigned a coach. They construct a customized workout plan directly in their Trainer Portal. You instantly view it on your mobile/desktop Member Portal. Any updates they make sync automatically!
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question">Can I access the facility 24/7? <span class="faq-icon">+</span></button>
                        <div class="faq-answer">
                            Yes, 24/7 keycard access is provided to Elite Performance and VIP Ultimate members. Basic Tier members can access the gym during staffed hours (6:00 AM - 10:00 PM).
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question">How do I cancel or pause my subscription? <span class="faq-icon">+</span></button>
                        <div class="faq-answer">
                            You can pause or cancel your subscription directly from your Member Portal settings under 'Membership Status' or send a quick email to our admin team. No penalty charges apply!
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add FAQ behavior
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                item.classList.toggle('active');
            });
        });
    } else if (state.currentView === 'blog') {
        const blogPosts = state.getData('blog');
        let blogCards = blogPosts.map(post => `
            <div class="glass-card blog-card">
                <div class="blog-image-mock">📝</div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span>By ${post.author}</span>
                        <span>•</span>
                        <span>${post.date}</span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-summary">${post.summary}</p>
                    <button class="btn btn-secondary btn-sm read-blog-btn" data-id="${post.id}">Read Full Article</button>
                </div>
            </div>
        `).join('');

        appRoot.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Fitness & Science Blog</h2>
                    <p>Stay informed with technical training concepts, recovery guides, and nutrition advice.</p>
                </div>
                <div class="blog-grid">
                    ${blogCards}
                </div>
            </div>
        `;
        
        document.querySelectorAll('.read-blog-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const post = blogPosts.find(p => p.id === id);
                
                openModal(`
                    <h2>${post.title}</h2>
                    <div style="font-size: 0.85rem; color: var(--text-muted); margin: 8px 0 24px 0;">
                        Published by ${post.author} on ${post.date}
                    </div>
                    <div style="line-height: 1.8; white-space: pre-line;">
                        ${post.content}
                    </div>
                    <button class="btn btn-secondary" style="margin-top: 30px;" onclick="closeModal()">Close</button>
                `);
            });
        });
    } else if (state.currentView === 'contact') {
        appRoot.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Contact Our Team</h2>
                    <p>Reach out to address questions, billing inquiries, or private trainer requests.</p>
                </div>
                <div class="contact-grid">
                    <div class="contact-info-card">
                        <div class="glass-card contact-item">
                            <div class="contact-icon">📍</div>
                            <div>
                                <h4>Our Location</h4>
                                <p style="color: var(--text-muted); font-size: 0.9rem;">100 Elite Performance Way, Boston, MA 02110</p>
                            </div>
                        </div>
                        <div class="glass-card contact-item">
                            <div class="contact-icon">📞</div>
                            <div>
                                <h4>Phone Support</h4>
                                <p style="color: var(--text-muted); font-size: 0.9rem;">+1 (555) 793-7848<br>Mon-Sun: 6:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                        <div class="glass-card contact-item">
                            <div class="contact-icon">✉️</div>
                            <div>
                                <h4>Email Inquiries</h4>
                                <p style="color: var(--text-muted); font-size: 0.9rem;">membership@triener.com<br>support@triener.com</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="glass-card">
                        <h3>Send a Message</h3>
                        <form id="contactForm" style="margin-top: 24px;">
                            <div class="form-group">
                                <label for="contactName">Full Name</label>
                                <input type="text" id="contactName" class="form-control" placeholder="John Doe" required>
                            </div>
                            <div class="form-group">
                                <label for="contactEmail">Email Address</label>
                                <input type="email" id="contactEmail" class="form-control" placeholder="john@example.com" required>
                            </div>
                            <div class="form-group">
                                <label for="contactMessage">Your Message</label>
                                <textarea id="contactMessage" class="form-control" placeholder="Enter your inquiry..." required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Message</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you! Our support staff will contact you shortly.', 'success');
            document.getElementById('contactForm').reset();
        });
    }
}

// --------------------------------------------------------------------------
// 7. View Rendering Functions: Member Portal
// --------------------------------------------------------------------------
function renderMemberView() {
    const appRoot = document.getElementById('appRoot');
    const member = state.currentUser;
    const plans = state.getData('plans');
    const trainers = state.getData('trainers');
    const myPlan = plans.find(p => p.id === member.planId) || { name: 'No Plan', price: 0 };
    const myTrainer = trainers.find(t => t.id === member.trainerId) || { name: 'Self Guided Training' };
    
    // Sidebar render
    const sidebarHtml = `
        <div class="portal-sidebar">
            <div class="portal-user-info">
                <div class="portal-user-avatar">${member.name.charAt(0)}</div>
                <h3 class="portal-user-name">${member.name}</h3>
                <span class="portal-user-role">Member Portal</span>
            </div>
            <ul class="portal-menu">
                <li class="portal-menu-item ${state.currentView === 'dashboard' ? 'active' : ''}"><a href="#" data-view="dashboard">📊 Dashboard</a></li>
                <li class="portal-menu-item ${state.currentView === 'workout-plan' ? 'active' : ''}"><a href="#" data-view="workout-plan">🏋️‍♂️ Workout Plan</a></li>
                <li class="portal-menu-item ${state.currentView === 'payments' ? 'active' : ''}"><a href="#" data-view="payments">💳 Payments & Receipts</a></li>
                <li class="portal-menu-item ${state.currentView === 'profile' ? 'active' : ''}"><a href="#" data-view="profile">👤 Edit Profile</a></li>
            </ul>
        </div>
    `;

    let innerContent = '';

    if (state.currentView === 'dashboard') {
        const attendance = state.getData('attendance').filter(a => a.memberId === member.id);
        const payments = state.getData('payments').filter(p => p.memberId === member.id);
        const lastCheckin = attendance.length > 0 ? `${attendance[attendance.length - 1].date} at ${attendance[attendance.length - 1].time}` : 'No check-ins yet';
        
        innerContent = `
            <div class="portal-content-pane">
                <h2>Member Dashboard</h2>
                
                <div class="stat-grid">
                    <div class="glass-card stat-card">
                        <div class="stat-title">Membership Status</div>
                        <div class="stat-value" style="font-size: 1.8rem; color: ${member.status === 'active' ? 'var(--success)' : 'var(--danger)'};">${member.status.toUpperCase()}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">Plan: ${myPlan.name}</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-title">Attendance</div>
                        <div class="stat-value">${attendance.length}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">Total visits logged</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-title">Expiry Date</div>
                        <div class="stat-value" style="font-size: 1.6rem;">${member.expiryDate}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">Renews automatically</div>
                    </div>
                </div>

                <div class="portal-layout" style="grid-template-columns: 1.2fr 1fr; gap: 24px;">
                    <div class="glass-card">
                        <h3>Facility Quick Access</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin: 8px 0 24px 0;">Use the digital card or QR code simulator to check-in at reception.</p>
                        
                        <div class="barcode-card-container">
                            <div class="barcode-card">
                                <div class="barcode-logo">▲ TRIENER FITNESS</div>
                                <div style="font-weight: bold; font-size: 1.1rem; text-align: left;">${member.name}</div>
                                <div style="font-size: 0.8rem; text-align: left; color: #64748b; margin-top: 4px;">ID: ${member.id}</div>
                                <div class="barcode-lines"></div>
                                <div class="barcode-number">${member.barcode}</div>
                            </div>
                            
                            <button class="btn btn-primary" id="btnSimulateScan">Simulate QR Check-In</button>
                        </div>
                    </div>

                    <div class="glass-card">
                        <h3>Your Coach</h3>
                        <div style="text-align: center; padding: 24px 0;">
                            <div class="portal-user-avatar" style="width: 80px; height: 80px; font-size: 2rem; background: rgba(var(--primary-rgb), 0.1); border: 2px solid var(--primary); color: #fff;">
                                ${myTrainer.photo || '🤝'}
                            </div>
                            <h4 style="margin: 16px 0 8px 0;">${myTrainer.name}</h4>
                            <p style="font-size: 0.85rem; color: var(--primary); font-weight: 600; text-transform: uppercase;">${myTrainer.role || ''}</p>
                            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 12px;">${myTrainer.bio || 'Consult reception to select a personal training coach.'}</p>
                        </div>
                        
                        ${member.trainerId ? `
                            <button class="btn btn-secondary" id="btnMsgTrainer" style="width: 100%;">Message Coach</button>
                        ` : ''}
                    </div>
                </div>

                <div class="glass-card">
                    <h3>Recent Attendance</h3>
                    <div class="table-container" style="margin-top: 16px;">
                        <table class="portal-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${attendance.length === 0 ? '<tr><td colspan="3" style="text-align:center;">No recent check-ins found.</td></tr>' : 
                                  attendance.slice(-3).reverse().map(a => `
                                    <tr>
                                        <td>${a.date}</td>
                                        <td>${a.time}</td>
                                        <td><span class="badge badge-active">Verified</span></td>
                                    </tr>
                                  `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

    } else if (state.currentView === 'workout-plan') {
        const workouts = state.getData('workouts');
        const plan = workouts.find(w => w.memberId === member.id);
        
        let workoutHtml = '';
        if (plan && plan.days && plan.days.length > 0) {
            workoutHtml = plan.days.map((day, dIdx) => `
                <div class="workout-day-block">
                    <h3 class="workout-day-title">${day.day}</h3>
                    <div class="exercise-list">
                        ${day.exercises.map((ex, eIdx) => `
                            <div class="exercise-item">
                                <div>
                                    <div class="exercise-name">${ex.name}</div>
                                    <div class="exercise-details">${ex.sets} Sets x ${ex.reps} Reps ${ex.weight ? `• Weight: ${ex.weight} lbs` : ''}</div>
                                </div>
                                <div class="exercise-actions">
                                    <button class="btn btn-secondary btn-sm toggle-exercise-btn" data-day="${dIdx}" data-ex="${eIdx}">Mark Done</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        } else {
            workoutHtml = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <p>No workout plan has been assigned to you yet.</p>
                    <p style="font-size: 0.9rem; margin-top: 8px;">If you have a personal trainer, request them to write one in their portal.</p>
                </div>
            `;
        }

        innerContent = `
            <div class="portal-content-pane">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Your Custom Workout Plan</h2>
                    <span class="badge badge-active">Assigned by ${myTrainer.name}</span>
                </div>
                
                <div class="glass-card">
                    ${workoutHtml}
                </div>
            </div>
        `;

    } else if (state.currentView === 'payments') {
        const payments = state.getData('payments').filter(p => p.memberId === member.id);
        
        innerContent = `
            <div class="portal-content-pane">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Billing & Payment History</h2>
                    <button class="btn btn-primary btn-sm" id="btnRenewMembership">Renew/Upgrade Plan</button>
                </div>

                <div class="glass-card">
                    <h3>Invoices</h3>
                    <div class="table-container" style="margin-top: 16px;">
                        <table class="portal-table">
                            <thead>
                                <tr>
                                    <th>Invoice ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Payment Method</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${payments.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No payment invoices found.</td></tr>' : 
                                  payments.slice().reverse().map(p => `
                                    <tr>
                                        <td><strong>#${p.id}</strong></td>
                                        <td>${p.date}</td>
                                        <td>$${p.amount}.00</td>
                                        <td>${p.method}</td>
                                        <td><span class="badge badge-active">${p.status}</span></td>
                                        <td>
                                            <button class="btn btn-secondary btn-sm btn-download-receipt" data-id="${p.id}">PDF Receipt</button>
                                        </td>
                                    </tr>
                                  `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

    } else if (state.currentView === 'profile') {
        innerContent = `
            <div class="portal-content-pane">
                <h2>Update Profile Details</h2>
                
                <div class="glass-card">
                    <form id="memberProfileForm">
                        <div class="form-group">
                            <label for="profName">Full Name</label>
                            <input type="text" id="profName" class="form-control" value="${member.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="profEmail">Email Address</label>
                            <input type="email" id="profEmail" class="form-control" value="${member.email}" required>
                        </div>
                        <div class="form-group">
                            <label for="profPhone">Phone Number</label>
                            <input type="text" id="profPhone" class="form-control" value="${member.phone || ''}">
                        </div>
                        <div class="form-group">
                            <label for="profBio">Personal Bio / Goals</label>
                            <textarea id="profBio" class="form-control">${member.bio || ''}</textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Save Profile Details</button>
                    </form>
                </div>
            </div>
        `;
    }

    appRoot.innerHTML = `
        <div class="container portal-layout">
            ${sidebarHtml}
            <div class="portal-content">
                ${innerContent}
            </div>
        </div>
    `;

    // Bind portal navigation clicks
    document.querySelectorAll('.portal-menu-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(link.getAttribute('data-view'));
        });
    });

    // Sub-view actions
    if (state.currentView === 'dashboard') {
        document.getElementById('btnSimulateScan').addEventListener('click', () => {
            simulateCheckIn(member.id);
        });
        if (member.trainerId) {
            document.getElementById('btnMsgTrainer').addEventListener('click', () => {
                showMessagingModal(member.trainerId, member.id);
            });
        }
    }

    if (state.currentView === 'workout-plan') {
        document.querySelectorAll('.toggle-exercise-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('btn-primary');
                if (btn.classList.contains('btn-primary')) {
                    btn.textContent = '✓ Done';
                    showToast('Exercise marked completed!', 'success');
                } else {
                    btn.textContent = 'Mark Done';
                }
            });
        });
    }

    if (state.currentView === 'payments') {
        document.querySelectorAll('.btn-download-receipt').forEach(btn => {
            btn.addEventListener('click', () => {
                const invoiceId = btn.getAttribute('data-id');
                simulateReceiptDownload(invoiceId);
            });
        });
        document.getElementById('btnRenewMembership').addEventListener('click', () => {
            showRenewalModal(member);
        });
    }

    if (state.currentView === 'profile') {
        document.getElementById('memberProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const members = state.getData('members');
            const idx = members.findIndex(m => m.id === member.id);
            if (idx !== -1) {
                members[idx].name = document.getElementById('profName').value;
                members[idx].email = document.getElementById('profEmail').value;
                members[idx].phone = document.getElementById('profPhone').value;
                members[idx].bio = document.getElementById('profBio').value;
                state.saveData('members', members);
                
                // Update local session context
                state.currentUser = members[idx];
                showToast('Profile updated successfully!', 'success');
                renderApp();
            }
        });
    }
}

// Check-in simulator
function simulateCheckIn(memberId) {
    const attendance = state.getData('attendance');
    const members = state.getData('members');
    const member = members.find(m => m.id === memberId);
    
    if (member.status !== 'active') {
        showToast('Access denied: Membership has expired!', 'error');
        return;
    }
    
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const checkin = {
        id: `att-${Date.now()}`,
        memberId,
        date,
        time
    };
    
    attendance.push(checkin);
    state.saveData('attendance', attendance);
    
    showToast('Success! Reception gate unlocked. Access Granted.', 'success');
    renderApp();
}

// Receipt Generator
function simulateReceiptDownload(invoiceId) {
    const payments = state.getData('payments');
    const invoice = payments.find(p => p.id === invoiceId);
    const members = state.getData('members');
    const member = members.find(m => m.id === invoice.memberId);
    
    const html = `
        <div style="font-family: monospace; color: #000; background: #fff; padding: 30px; border-radius: 8px;">
            <div style="text-align: center; border-bottom: 2px dashed #000; padding-bottom: 20px;">
                <h3 style="margin: 0; font-size: 1.5rem; letter-spacing: 2px;">TRIENER FITNESS receipt</h3>
                <p style="margin: 5px 0 0 0; font-size: 0.8rem;">100 ELITE PERFORMANCE WAY, BOSTON, MA</p>
                <p style="margin: 2px 0 0 0; font-size: 0.8rem;">TEL: +1 (555) 793-7848</p>
            </div>
            
            <div style="margin: 20px 0; font-size: 0.9rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>INVOICE ID:</span>
                    <span>#${invoice.id}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>DATE:</span>
                    <span>${invoice.date}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>MEMBER:</span>
                    <span>${member.name}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>METHOD:</span>
                    <span>${invoice.method}</span>
                </div>
            </div>
            
            <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 15px 0; margin-bottom: 20px; font-weight: bold;">
                <div style="display: flex; justify-content: space-between;">
                    <span>MEMBERSHIP RENEWAL RETAINER</span>
                    <span>$${invoice.amount}.00</span>
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; margin-bottom: 30px;">
                <span>TOTAL:</span>
                <span>$${invoice.amount}.00</span>
            </div>
            
            <div style="text-align: center; font-size: 0.8rem; border-top: 2px dashed #000; padding-top: 20px;">
                <p style="margin: 0;">THANK YOU FOR YOUR PATRONAGE!</p>
                <p style="margin: 5px 0 0 0;">GET FIT, STAY STRONG.</p>
            </div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 12px; justify-content: flex-end;">
            <button class="btn btn-primary" onclick="window.print()">Print Receipt</button>
            <button class="btn btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
    
    openModal(html);
}

// Renewal Modal
function showRenewalModal(member) {
    const plans = state.getData('plans');
    const options = plans.map(p => `<option value="${p.id}" ${p.id === member.planId ? 'selected' : ''}>${p.name} - $${p.price}/mo</option>`).join('');
    
    const html = `
        <div style="padding: 10px;">
            <h3>Renew / Upgrade Membership</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px;">Select your desired tier and confirm your subscription payment details.</p>
            
            <form id="renewalForm" style="margin-top: 24px;">
                <div class="form-group">
                    <label for="renewPlan">Select Plan</label>
                    <select id="renewPlan" class="form-control">
                        ${options}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Card Information</label>
                    <input type="text" class="form-control" placeholder="4111 2222 3333 4444" value="4111 2222 3333 4444" required>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div class="form-group">
                        <label>Expiry Date</label>
                        <input type="text" class="form-control" placeholder="MM/YY" value="12/29" required>
                    </div>
                    <div class="form-group">
                        <label>CVC Code</label>
                        <input type="text" class="form-control" placeholder="123" value="123" required>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 15px;">Confirm Payment</button>
            </form>
        </div>
    `;
    
    openModal(html);
    
    document.getElementById('renewalForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const planId = document.getElementById('renewPlan').value;
        const plans = state.getData('plans');
        const targetPlan = plans.find(p => p.id === planId);
        
        const members = state.getData('members');
        const mIdx = members.findIndex(m => m.id === member.id);
        
        if (mIdx !== -1) {
            // Update plan and extend expiry
            members[mIdx].planId = planId;
            members[mIdx].status = 'active';
            
            const baseDate = members[mIdx].status === 'active' ? new Date(members[mIdx].expiryDate) : new Date();
            const extendedDate = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);
            members[mIdx].expiryDate = extendedDate.toISOString().split('T')[0];
            
            state.saveData('members', members);
            
            // Add invoice payment record
            const payments = state.getData('payments');
            payments.push({
                id: `inv-${Math.floor(100 + Math.random() * 900)}`,
                memberId: member.id,
                amount: targetPlan.price,
                status: 'paid',
                date: new Date().toISOString().split('T')[0],
                method: 'Visa ending 4444'
            });
            state.saveData('payments', payments);
            
            state.currentUser = members[mIdx];
            closeModal();
            showToast(`Success! Your membership has been updated to ${targetPlan.name}.`, 'success');
            renderApp();
        }
    });
}

// --------------------------------------------------------------------------
// 8. View Rendering Functions: Trainer Portal
// --------------------------------------------------------------------------
function renderTrainerView() {
    const appRoot = document.getElementById('appRoot');
    const trainer = state.currentUser;
    const members = state.getData('members').filter(m => m.trainerId === trainer.id);
    
    const sidebarHtml = `
        <div class="portal-sidebar">
            <div class="portal-user-info">
                <div class="portal-user-avatar">${trainer.name.charAt(0)}</div>
                <h3 class="portal-user-name">${trainer.name}</h3>
                <span class="portal-user-role">Trainer Portal</span>
            </div>
            <ul class="portal-menu">
                <li class="portal-menu-item active"><a href="#" data-view="dashboard">👥 My Members</a></li>
            </ul>
        </div>
    `;

    let innerContent = '';
    
    if (state.currentView === 'dashboard') {
        innerContent = `
            <div class="portal-content-pane">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Trainer Client Panel</h2>
                    <span class="badge badge-active">${members.length} Active Clients</span>
                </div>
                
                <div class="glass-card">
                    <h3>Assigned Gym Members</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Select a member to edit their routine, send messages, or schedule sessions.</p>
                    
                    <div class="table-container" style="margin-top: 20px;">
                        <table class="portal-table">
                            <thead>
                                <tr>
                                    <th>Client Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${members.length === 0 ? '<tr><td colspan="5" style="text-align:center;">No members currently assigned to you.</td></tr>' : 
                                  members.map(m => `
                                    <tr>
                                        <td><strong>${m.name}</strong></td>
                                        <td>${m.email}</td>
                                        <td>${m.phone}</td>
                                        <td><span class="badge badge-${m.status === 'active' ? 'active' : 'expired'}">${m.status}</span></td>
                                        <td>
                                            <div style="display: flex; gap: 8px;">
                                                <button class="btn btn-primary btn-sm btn-edit-routine" data-id="${m.id}">Edit Routine</button>
                                                <button class="btn btn-secondary btn-sm btn-msg-client" data-id="${m.id}">Chat</button>
                                            </div>
                                        </td>
                                    </tr>
                                  `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    appRoot.innerHTML = `
        <div class="container portal-layout">
            ${sidebarHtml}
            <div class="portal-content">
                ${innerContent}
            </div>
        </div>
    `;
    
    // Bind listeners
    if (state.currentView === 'dashboard') {
        document.querySelectorAll('.btn-edit-routine').forEach(btn => {
            btn.addEventListener('click', () => {
                const memberId = btn.getAttribute('data-id');
                showWorkoutEditor(memberId);
            });
        });
        
        document.querySelectorAll('.btn-msg-client').forEach(btn => {
            btn.addEventListener('click', () => {
                const memberId = btn.getAttribute('data-id');
                showMessagingModal(trainer.id, memberId);
            });
        });
    }
}

// Workout plan editor modal
function showWorkoutEditor(memberId) {
    const workouts = state.getData('workouts');
    const members = state.getData('members');
    const member = members.find(m => m.id === memberId);
    let plan = workouts.find(w => w.memberId === memberId);
    
    if (!plan) {
        plan = { memberId, days: [{ day: 'Day 1: Full Body', exercises: [] }] };
    }
    
    let html = `
        <div>
            <h3>Workout Routine Editor</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Assign days, set goals, reps, and weights for <strong>${member.name}</strong>.</p>
            
            <form id="workoutEditorForm" style="margin-top: 20px;">
                <div id="workoutDaysContainer" style="max-height: 380px; overflow-y: auto; padding-right: 10px;">
                    ${plan.days.map((day, dIdx) => `
                        <div class="glass-card day-editor-block" style="padding: 20px; margin-bottom: 16px; background: rgba(0,0,0,0.15);" data-day="${dIdx}">
                            <div class="form-group">
                                <label>Day Title</label>
                                <input type="text" class="form-control day-title-input" value="${day.day}" required>
                            </div>
                            
                            <div class="exercise-rows-container">
                                <label style="font-size: 0.8rem; font-weight: bold; color: var(--text-muted);">Exercises</label>
                                ${day.exercises.map((ex, eIdx) => `
                                    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 8px; margin-top: 8px;" class="exercise-row">
                                        <input type="text" class="form-control ex-name" placeholder="Exercise" value="${ex.name}" required>
                                        <input type="number" class="form-control ex-sets" placeholder="Sets" value="${ex.sets}" required>
                                        <input type="text" class="form-control ex-reps" placeholder="Reps" value="${ex.reps}" required>
                                        <input type="number" class="form-control ex-weight" placeholder="Lbs" value="${ex.weight || ''}">
                                        <button type="button" class="btn btn-danger btn-sm btn-remove-row" style="padding: 8px; border-radius: 6px;">&times;</button>
                                    </div>
                                `).join('')}
                            </div>
                            <button type="button" class="btn btn-secondary btn-sm btn-add-exercise-row" style="margin-top: 12px; font-size: 0.75rem;">+ Add Exercise</button>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 24px; justify-content: flex-end;">
                    <button type="button" class="btn btn-secondary" id="btnEditorAddDay">+ Add Training Day</button>
                    <button type="submit" class="btn btn-primary">Save Workout Routine</button>
                </div>
            </form>
        </div>
    `;
    
    openModal(html);
    
    // Bind editor DOM triggers
    const form = document.getElementById('workoutEditorForm');
    const container = document.getElementById('workoutDaysContainer');
    
    // Helper to add row
    function createRowElement() {
        const div = document.createElement('div');
        div.style.display = 'grid';
        div.style.gridTemplateColumns = '2fr 1fr 1fr 1fr auto';
        div.style.gap = '8px';
        div.style.marginTop = '8px';
        div.className = 'exercise-row';
        div.innerHTML = `
            <input type="text" class="form-control ex-name" placeholder="Exercise" required>
            <input type="number" class="form-control ex-sets" placeholder="Sets" required>
            <input type="text" class="form-control ex-reps" placeholder="Reps" required>
            <input type="number" class="form-control ex-weight" placeholder="Lbs">
            <button type="button" class="btn btn-danger btn-sm btn-remove-row" style="padding: 8px; border-radius: 6px;">&times;</button>
        `;
        div.querySelector('.btn-remove-row').addEventListener('click', () => div.remove());
        return div;
    }
    
    // Bind initial rows delete buttons
    document.querySelectorAll('.btn-remove-row').forEach(b => {
        b.addEventListener('click', () => b.parentElement.remove());
    });
    
    // Bind add exercise
    document.querySelectorAll('.btn-add-exercise-row').forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const block = btn.parentElement;
            block.querySelector('.exercise-rows-container').appendChild(createRowElement());
        });
    });
    
    // Bind add day
    document.getElementById('btnEditorAddDay').addEventListener('click', () => {
        const dayIdx = container.querySelectorAll('.day-editor-block').length;
        const block = document.createElement('div');
        block.className = 'glass-card day-editor-block';
        block.style.cssText = 'padding: 20px; margin-bottom: 16px; background: rgba(0,0,0,0.15);';
        block.setAttribute('data-day', dayIdx);
        block.innerHTML = `
            <div class="form-group">
                <label>Day Title</label>
                <input type="text" class="form-control day-title-input" placeholder="Day ${dayIdx + 1}: Split routine" required>
            </div>
            
            <div class="exercise-rows-container">
                <label style="font-size: 0.8rem; font-weight: bold; color: var(--text-muted);">Exercises</label>
            </div>
            <button type="button" class="btn btn-secondary btn-sm btn-add-exercise-row" style="margin-top: 12px; font-size: 0.75rem;">+ Add Exercise</button>
        `;
        
        block.querySelector('.btn-add-exercise-row').addEventListener('click', () => {
            block.querySelector('.exercise-rows-container').appendChild(createRowElement());
        });
        
        container.appendChild(block);
    });
    
    // Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const days = [];
        container.querySelectorAll('.day-editor-block').forEach(dayBlock => {
            const dayTitle = dayBlock.querySelector('.day-title-input').value;
            const exercises = [];
            
            dayBlock.querySelectorAll('.exercise-row').forEach(row => {
                exercises.push({
                    name: row.querySelector('.ex-name').value,
                    sets: parseInt(row.querySelector('.ex-sets').value),
                    reps: row.querySelector('.ex-reps').value,
                    weight: parseFloat(row.querySelector('.ex-weight').value) || ''
                });
            });
            
            days.push({ day: dayTitle, exercises });
        });
        
        const allWorkouts = state.getData('workouts');
        const wIdx = allWorkouts.findIndex(w => w.memberId === memberId);
        
        if (wIdx !== -1) {
            allWorkouts[wIdx].days = days;
        } else {
            allWorkouts.push({ memberId, days });
        }
        
        state.saveData('workouts', allWorkouts);
        closeModal();
        showToast(`Workout routine for ${member.name} updated!`, 'success');
        renderApp();
    });
}

// Messaging simulation modal
function showMessagingModal(trainerId, memberId) {
    const trainers = state.getData('trainers');
    const members = state.getData('members');
    
    const targetTrainer = trainers.find(t => t.id === trainerId);
    const targetMember = members.find(m => m.id === memberId);
    
    const sender = state.currentRole === 'trainer' ? targetTrainer : targetMember;
    const recipient = state.currentRole === 'trainer' ? targetMember : targetTrainer;
    
    function loadChatLogs() {
        const messages = state.getData('messages');
        const filterMsg = messages.filter(m => 
            (m.from === trainerId && m.to === memberId) || 
            (m.from === memberId && m.to === trainerId)
        );
        
        return filterMsg.map(m => {
            const isOutgoing = (state.currentRole === 'trainer' && m.from === trainerId) || 
                               (state.currentRole === 'member' && m.from === memberId);
            return `
                <div class="chat-bubble ${isOutgoing ? 'outgoing' : 'incoming'}">
                    <div>${m.content}</div>
                    <div style="font-size: 0.65rem; opacity: 0.6; text-align: right; margin-top: 4px;">${m.timestamp}</div>
                </div>
            `;
        }).join('');
    }
    
    const html = `
        <div style="display: flex; flex-direction: column; height: 500px;">
            <h3>Conversation with ${recipient.name}</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem;">Portal messaging simulator</p>
            
            <div id="chatMessagesBox" style="flex-grow: 1; overflow-y: auto; background: var(--bg-input); padding: 15px; border-radius: 8px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
                ${loadChatLogs() || '<div style="text-align:center; color: var(--text-muted); font-size: 0.9rem; margin-top: 40px;">No messages. Send a message to start!</div>'}
            </div>
            
            <form id="chatSendForm" style="display: flex; gap: 10px;">
                <input type="text" id="chatInputMessage" class="form-control" placeholder="Type a message..." required>
                <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">Send</button>
            </form>
        </div>
    `;
    
    openModal(html);
    
    // Scroll chat to bottom
    const chatBox = document.getElementById('chatMessagesBox');
    chatBox.scrollTop = chatBox.scrollHeight;
    
    document.getElementById('chatSendForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chatInputMessage');
        const text = input.value.trim();
        if (!text) return;
        
        const messages = state.getData('messages');
        const now = new Date();
        const timestamp = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messages.push({
            from: state.currentRole === 'trainer' ? trainerId : memberId,
            to: state.currentRole === 'trainer' ? memberId : trainerId,
            timestamp,
            content: text
        });
        
        state.saveData('messages', messages);
        input.value = '';
        
        // Reload chat view
        chatBox.innerHTML = loadChatLogs();
        chatBox.scrollTop = chatBox.scrollHeight;
        showToast('Message sent!', 'success');
    });
}

// --------------------------------------------------------------------------
// 9. View Rendering Functions: Admin Portal
// --------------------------------------------------------------------------
function renderAdminView() {
    const appRoot = document.getElementById('appRoot');
    const members = state.getData('members');
    const trainers = state.getData('trainers');
    const plans = state.getData('plans');
    const payments = state.getData('payments');
    const attendance = state.getData('attendance');
    
    // Sidebar render
    const sidebarHtml = `
        <div class="portal-sidebar">
            <div class="portal-user-info">
                <div class="portal-user-avatar">A</div>
                <h3 class="portal-user-name">System Admin</h3>
                <span class="portal-user-role">Administrator</span>
            </div>
            <ul class="portal-menu">
                <li class="portal-menu-item ${state.currentView === 'dashboard' ? 'active' : ''}"><a href="#" data-view="dashboard">📊 Dashboard Metrics</a></li>
                <li class="portal-menu-item ${state.currentView === 'members-mgmt' ? 'active' : ''}"><a href="#" data-view="members-mgmt">👥 Members Mgmt</a></li>
                <li class="portal-menu-item ${state.currentView === 'trainers-mgmt' ? 'active' : ''}"><a href="#" data-view="trainers-mgmt">🏋️‍♂️ Trainers Mgmt</a></li>
                <li class="portal-menu-item ${state.currentView === 'plans-mgmt' ? 'active' : ''}"><a href="#" data-view="plans-mgmt">💳 Membership Plans</a></li>
            </ul>
        </div>
    `;

    let innerContent = '';

    if (state.currentView === 'dashboard') {
        const activeCount = members.filter(m => m.status === 'active').length;
        const expiredCount = members.filter(m => m.status === 'expired').length;
        const totalRev = payments.reduce((acc, curr) => acc + curr.amount, 0);
        
        // Filter attendance for today (simulated 2026-08-05 based on calendar locale time)
        const todayStr = '2026-08-05';
        const todayAttendance = attendance.filter(a => a.date === todayStr).length;

        // Render premium custom SVG chart representing monthly revenue mock
        const svgChart = `
            <div class="chart-container">
                <div class="chart-header">
                    <h3>Monthly Business Revenue Trend</h3>
                    <span style="font-size: 0.85rem; font-weight:600; color: var(--primary);">Total: $${totalRev}.00 USD</span>
                </div>
                <svg class="chart-svg" viewBox="0 0 600 220">
                    <defs>
                        <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="var(--primary)" />
                            <stop offset="100%" stop-color="var(--primary)" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                    <!-- Grid Lines -->
                    <line x1="50" y1="20" x2="550" y2="20" class="chart-grid-line" />
                    <line x1="50" y1="70" x2="550" y2="70" class="chart-grid-line" />
                    <line x1="50" y1="120" x2="550" y2="120" class="chart-grid-line" />
                    <line x1="50" y1="170" x2="550" y2="170" class="chart-grid-line" />
                    
                    <!-- Line Area -->
                    <path d="M 50,170 Q 150,130 250,150 T 450,60 T 550,40 L 550,170 Z" class="chart-line-area" />
                    
                    <!-- Trend Line -->
                    <path d="M 50,170 Q 150,130 250,150 T 450,60 T 550,40" class="chart-line" />
                    
                    <!-- Nodes -->
                    <circle cx="50" cy="170" r="5" fill="var(--primary)" />
                    <circle cx="200" cy="140" r="5" fill="var(--primary)" />
                    <circle cx="350" cy="110" r="5" fill="var(--primary)" />
                    <circle cx="500" cy="55" r="5" fill="var(--primary)" />
                    <circle cx="550" cy="40" r="5" fill="var(--info)" />
                    
                    <!-- Labels -->
                    <text x="50" y="195" class="chart-label">April</text>
                    <text x="200" y="195" class="chart-label">May</text>
                    <text x="350" y="195" class="chart-label">June</text>
                    <text x="500" y="195" class="chart-label">July</text>
                    <text x="550" y="195" class="chart-label">August (MTD)</text>
                </svg>
            </div>
        `;

        innerContent = `
            <div class="portal-content-pane">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Executive Administration Dashboard</h2>
                    <button class="btn btn-secondary btn-sm" id="btnExportStats">Export Dashboard Report</button>
                </div>
                
                <div class="stat-grid">
                    <div class="glass-card stat-card">
                        <div class="stat-title">Total Registered Members</div>
                        <div class="stat-value">${members.length}</div>
                        <div class="stat-trend trend-up">▲ 12.8% vs last month</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-title">Active Members</div>
                        <div class="stat-value" style="color: var(--success);">${activeCount}</div>
                        <div class="stat-trend" style="color: var(--text-muted);">${expiredCount} Expired contracts</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-title">Today's Gym Visits</div>
                        <div class="stat-value">${todayAttendance}</div>
                        <div class="stat-trend trend-up">▲ 4 visits logged today</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-title">Total Revenue</div>
                        <div class="stat-value">$${totalRev}</div>
                        <div class="stat-trend trend-up">▲ $99.00 this week</div>
                    </div>
                </div>

                ${svgChart}

                <div class="glass-card">
                    <h3>Recent Transactions</h3>
                    <div class="table-container" style="margin-top: 16px;">
                        <table class="portal-table">
                            <thead>
                                <tr>
                                    <th>Ref ID</th>
                                    <th>Member</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${payments.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No transactions logged.</td></tr>' : 
                                  payments.slice(-3).reverse().map(p => {
                                      const memberObj = members.find(m => m.id === p.memberId) || { name: 'Unknown Member' };
                                      return `
                                        <tr>
                                            <td>#${p.id}</td>
                                            <td><strong>${memberObj.name}</strong></td>
                                            <td>${p.date}</td>
                                            <td>$${p.amount}.00</td>
                                            <td>${p.method}</td>
                                            <td><span class="badge badge-active">${p.status}</span></td>
                                        </tr>
                                      `;
                                  }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

    } else if (state.currentView === 'members-mgmt') {
        innerContent = `
            <div class="portal-content-pane">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Gym Member Directory</h2>
                    <button class="btn btn-primary btn-sm" id="btnAdminAddMember">+ Create New Member</button>
                </div>
                
                <div class="glass-card">
                    <div class="table-container">
                        <table class="portal-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Trainer</th>
                                    <th>Status</th>
                                    <th>Contract Expiry</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${members.map(m => {
                                    const trainerObj = trainers.find(t => t.id === m.trainerId) || { name: 'None' };
                                    return `
                                        <tr>
                                            <td><strong>${m.name}</strong></td>
                                            <td>${m.email}</td>
                                            <td>${trainerObj.name}</td>
                                            <td><span class="badge badge-${m.status === 'active' ? 'active' : 'expired'}">${m.status}</span></td>
                                            <td>${m.expiryDate}</td>
                                            <td>
                                                <div style="display: flex; gap: 8px;">
                                                    <button class="btn btn-secondary btn-sm btn-admin-edit-member" data-id="${m.id}">Edit</button>
                                                    <button class="btn btn-danger btn-sm btn-admin-delete-member" data-id="${m.id}">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

    } else if (state.currentView === 'trainers-mgmt') {
        innerContent = `
            <div class="portal-content-pane">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Trainer Coach Directory</h2>
                    <button class="btn btn-primary btn-sm" id="btnAdminAddTrainer">+ Add New Trainer</button>
                </div>
                
                <div class="glass-card">
                    <div class="table-container">
                        <table class="portal-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Specialization</th>
                                    <th>Bio</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${trainers.map(t => `
                                    <tr>
                                        <td style="font-size: 1.5rem;">${t.photo}</td>
                                        <td><strong>${t.name}</strong></td>
                                        <td>${t.role}</td>
                                        <td style="max-width: 300px; font-size:0.8rem; color: var(--text-muted);">${t.bio}</td>
                                        <td>
                                            <div style="display: flex; gap: 8px;">
                                                <button class="btn btn-secondary btn-sm btn-admin-edit-trainer" data-id="${t.id}">Edit</button>
                                                <button class="btn btn-danger btn-sm btn-admin-delete-trainer" data-id="${t.id}">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

    } else if (state.currentView === 'plans-mgmt') {
        innerContent = `
            <div class="portal-content-pane">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Membership Plans Manager</h2>
                    <button class="btn btn-primary btn-sm" id="btnAdminAddPlan">+ Add Membership Tier</button>
                </div>
                
                <div class="glass-card">
                    <div class="table-container">
                        <table class="portal-table">
                            <thead>
                                <tr>
                                    <th>Tier Name</th>
                                    <th>Cost / Price</th>
                                    <th>Billing Duration</th>
                                    <th>Benefits / Features Included</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${plans.map(p => `
                                    <tr>
                                        <td><strong>${p.name}</strong></td>
                                        <td>$${p.price}.00</td>
                                        <td>Per ${p.duration}</td>
                                        <td style="font-size: 0.8rem; color: var(--text-muted);">${p.features.join(', ')}</td>
                                        <td>
                                            <div style="display: flex; gap: 8px;">
                                                <button class="btn btn-secondary btn-sm btn-admin-edit-plan" data-id="${p.id}">Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    appRoot.innerHTML = `
        <div class="container portal-layout">
            ${sidebarHtml}
            <div class="portal-content">
                ${innerContent}
            </div>
        </div>
    `;

    // Bind navigation clicks
    document.querySelectorAll('.portal-menu-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(link.getAttribute('data-view'));
        });
    });

    // Dashboard triggers
    if (state.currentView === 'dashboard') {
        document.getElementById('btnExportStats').addEventListener('click', () => {
            simulateStatsExport();
        });
    }

    // CRUD triggers
    if (state.currentView === 'members-mgmt') {
        document.getElementById('btnAdminAddMember').addEventListener('click', showAdminMemberModal);
        
        document.querySelectorAll('.btn-admin-edit-member').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                showAdminMemberModal(id);
            });
        });

        document.querySelectorAll('.btn-admin-delete-member').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this gym member? This action is irreversible.')) {
                    let list = state.getData('members');
                    list = list.filter(m => m.id !== id);
                    state.saveData('members', list);
                    showToast('Member deleted successfully.', 'success');
                    renderApp();
                }
            });
        });
    }

    if (state.currentView === 'trainers-mgmt') {
        document.getElementById('btnAdminAddTrainer').addEventListener('click', showAdminTrainerModal);
        
        document.querySelectorAll('.btn-admin-edit-trainer').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                showAdminTrainerModal(id);
            });
        });

        document.querySelectorAll('.btn-admin-delete-trainer').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this trainer?')) {
                    let list = state.getData('trainers');
                    list = list.filter(t => t.id !== id);
                    state.saveData('trainers', list);
                    showToast('Trainer deleted successfully.', 'success');
                    renderApp();
                }
            });
        });
    }

    if (state.currentView === 'plans-mgmt') {
        document.getElementById('btnAdminAddPlan').addEventListener('click', showAdminPlanModal);
        
        document.querySelectorAll('.btn-admin-edit-plan').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                showAdminPlanModal(id);
            });
        });
    }
}

// Stats CSV/PDF Excel Simulation export
function simulateStatsExport() {
    const members = state.getData('members');
    const active = members.filter(m => m.status === 'active').length;
    const expired = members.filter(m => m.status === 'expired').length;
    const totalRev = state.getData('payments').reduce((acc, curr) => acc + curr.amount, 0);

    const csvContent = 
`Triener Gym Business Metrics Report
Generated: ${new Date().toLocaleString()}

Metric,Value
Total Members,${members.length}
Active Subscriptions,${active}
Expired Subscriptions,${expired}
Total Gross Revenue,$${totalRev}.00 USD
`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `triener_executive_metrics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Excel/CSV dashboard report downloaded!', 'success');
}

// CRUD Modals: Admin Member
function showAdminMemberModal(memberId = null) {
    const members = state.getData('members');
    const trainers = state.getData('trainers');
    const plans = state.getData('plans');
    
    const isEdit = memberId !== null;
    const member = isEdit ? members.find(m => m.id === memberId) : {
        name: '', email: '', phone: '', planId: plans[0].id, trainerId: '', status: 'active', expiryDate: ''
    };
    
    const trainerOptions = `<option value="">None (Self Guided)</option>` + 
        trainers.map(t => `<option value="${t.id}" ${t.id === member.trainerId ? 'selected' : ''}>${t.name}</option>`).join('');
        
    const planOptions = plans.map(p => `<option value="${p.id}" ${p.id === member.planId ? 'selected' : ''}>${p.name}</option>`).join('');

    const html = `
        <div>
            <h3>${isEdit ? 'Modify Member File' : 'Register New Facility Member'}</h3>
            <form id="adminMemberForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="mName" class="form-control" value="${member.name}" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="mEmail" class="form-control" value="${member.email}" required>
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="text" id="mPhone" class="form-control" value="${member.phone || ''}">
                </div>
                <div class="form-group">
                    <label>Assign Personal Trainer</label>
                    <select id="mTrainer" class="form-control">
                        ${trainerOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Membership Tier Plan</label>
                    <select id="mPlan" class="form-control">
                        ${planOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Contract Status</label>
                    <select id="mStatus" class="form-control">
                        <option value="active" ${member.status === 'active' ? 'selected' : ''}>Active</option>
                        <option value="expired" ${member.status === 'expired' ? 'selected' : ''}>Expired</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Contract Expiry Date</label>
                    <input type="date" id="mExpiry" class="form-control" value="${member.expiryDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]}" required>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width:100%; margin-top:15px;">${isEdit ? 'Save Member Info' : 'Create Member Profile'}</button>
            </form>
        </div>
    `;
    
    openModal(html);
    
    document.getElementById('adminMemberForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('mName').value;
        const email = document.getElementById('mEmail').value;
        const phone = document.getElementById('mPhone').value;
        const trainerId = document.getElementById('mTrainer').value;
        const planId = document.getElementById('mPlan').value;
        const status = document.getElementById('mStatus').value;
        const expiryDate = document.getElementById('mExpiry').value;
        
        let allMembers = state.getData('members');
        
        if (isEdit) {
            const idx = allMembers.findIndex(m => m.id === memberId);
            allMembers[idx] = { ...allMembers[idx], name, email, phone, trainerId, planId, status, expiryDate };
        } else {
            allMembers.push({
                id: `member-${Date.now()}`,
                name, email, password: 'password', phone, trainerId, planId, status,
                startDate: new Date().toISOString().split('T')[0],
                expiryDate,
                barcode: `TRN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
                bio: 'New profile created by Admin.'
            });
        }
        
        state.saveData('members', allMembers);
        closeModal();
        showToast(isEdit ? 'Member profile updated.' : 'New member created.', 'success');
        renderApp();
    });
}

// CRUD Modals: Admin Trainer
function showAdminTrainerModal(trainerId = null) {
    const trainers = state.getData('trainers');
    const isEdit = trainerId !== null;
    const trainer = isEdit ? trainers.find(t => t.id === trainerId) : {
        name: '', role: '', bio: '', photo: '🏋️‍♂️'
    };
    
    const html = `
        <div>
            <h3>${isEdit ? 'Modify Coach Profile' : 'Add Coach Staff File'}</h3>
            <form id="adminTrainerForm" style="margin-top:20px;">
                <div class="form-group">
                    <label>Coach Full Name</label>
                    <input type="text" id="tName" class="form-control" value="${trainer.name}" required>
                </div>
                <div class="form-group">
                    <label>Role/Specialization</label>
                    <input type="text" id="tRole" class="form-control" value="${trainer.role}" placeholder="e.g. Strength & Conditioning" required>
                </div>
                <div class="form-group">
                    <label>Short Bio Description</label>
                    <textarea id="tBio" class="form-control" required>${trainer.bio}</textarea>
                </div>
                <div class="form-group">
                    <label>Profile Avatar Icon</label>
                    <select id="tPhoto" class="form-control">
                        <option value="🏋️‍♂️" ${trainer.photo === '🏋️‍♂️' ? 'selected' : ''}>🏋️‍♂️ Weightlifter</option>
                        <option value="🏃‍♀️" ${trainer.photo === '🏃‍♀️' ? 'selected' : ''}>🏃‍♀️ Runner Female</option>
                        <option value="🧘‍♂️" ${trainer.photo === '🧘‍♂️' ? 'selected' : ''}>🧘‍♂️ Yoga Instructor</option>
                        <option value="💪" ${trainer.photo === '💪' ? 'selected' : ''}>💪 Flex Muscle</option>
                    </select>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width:100%; margin-top:15px;">Save Coach File</button>
            </form>
        </div>
    `;
    
    openModal(html);
    
    document.getElementById('adminTrainerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('tName').value;
        const role = document.getElementById('tRole').value;
        const bio = document.getElementById('tBio').value;
        const photo = document.getElementById('tPhoto').value;
        
        let allTrainers = state.getData('trainers');
        
        if (isEdit) {
            const idx = allTrainers.findIndex(t => t.id === trainerId);
            allTrainers[idx] = { ...allTrainers[idx], name, role, bio, photo };
        } else {
            allTrainers.push({
                id: `trainer-${Date.now()}`,
                name, role, bio, photo
            });
        }
        
        state.saveData('trainers', allTrainers);
        closeModal();
        showToast(isEdit ? 'Trainer coach profile saved.' : 'Trainer coach created.', 'success');
        renderApp();
    });
}

// CRUD Modals: Admin Plan
function showAdminPlanModal(planId = null) {
    const plans = state.getData('plans');
    const isEdit = planId !== null;
    const plan = isEdit ? plans.find(p => p.id === planId) : {
        name: '', price: 0, duration: 'month', features: [], disabled: []
    };
    
    const html = `
        <div>
            <h3>Modify Membership Tier</h3>
            <form id="adminPlanForm" style="margin-top:20px;">
                <div class="form-group">
                    <label>Tier Name</label>
                    <input type="text" id="pName" class="form-control" value="${plan.name}" required>
                </div>
                <div class="form-group">
                    <label>Subscription Fee ($)</label>
                    <input type="number" id="pPrice" class="form-control" value="${plan.price}" required>
                </div>
                <div class="form-group">
                    <label>Included Features (Comma Separated)</label>
                    <textarea id="pFeatures" class="form-control" required>${plan.features.join(', ')}</textarea>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width:100%; margin-top:15px;">Update Membership Tier</button>
            </form>
        </div>
    `;
    
    openModal(html);
    
    document.getElementById('adminPlanForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('pName').value;
        const price = parseInt(document.getElementById('pPrice').value);
        const features = document.getElementById('pFeatures').value.split(',').map(f => f.trim()).filter(Boolean);
        
        let allPlans = state.getData('plans');
        
        if (isEdit) {
            const idx = allPlans.findIndex(p => p.id === planId);
            allPlans[idx] = { ...allPlans[idx], name, price, features };
        } else {
            allPlans.push({
                id: `plan-${Date.now()}`,
                name, price, duration: 'month', features, disabled: []
            });
        }
        
        state.saveData('plans', allPlans);
        closeModal();
        showToast('Membership tier plan updated.', 'success');
        renderApp();
    });
}

// --------------------------------------------------------------------------
// 10. Developer Toolbar Simulator Handler & Theme Toggles
// --------------------------------------------------------------------------
function setupDeveloperToolbar() {
    const devToggleBtn = document.getElementById('devToggleBtn');
    const devToolbar = document.getElementById('devToolbar');
    const devToolbarBody = document.getElementById('devToolbarBody');
    const devUserSelector = document.getElementById('devUserSelector');
    const devUserSelect = document.getElementById('devUserSelect');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Collapse toggle
    devToggleBtn.addEventListener('click', () => {
        devToolbar.classList.toggle('collapsed');
        if (devToolbar.classList.contains('collapsed')) {
            devToggleBtn.textContent = '▲';
        } else {
            devToggleBtn.textContent = '▼';
        }
    });
    
    // Role button listeners
    document.querySelectorAll('.dev-role-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const role = btn.getAttribute('data-role');
            
            document.querySelectorAll('.dev-role-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            updateUserSelector(role);
            
            const selectedUserId = devUserSelect.value || null;
            state.setRole(role, selectedUserId);
        });
    });
    
    // User change listener
    devUserSelect.addEventListener('change', () => {
        const activeRoleBtn = document.querySelector('.dev-role-btn.active');
        const role = activeRoleBtn ? activeRoleBtn.getAttribute('data-role') : 'public';
        state.setRole(role, devUserSelect.value);
    });
    
    // Helper to update select dropdown options
    function updateUserSelector(role) {
        devUserSelect.innerHTML = '';
        
        if (role === 'member') {
            const members = state.getData('members');
            members.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m.id;
                opt.textContent = `${m.name} (${m.status.toUpperCase()})`;
                devUserSelect.appendChild(opt);
            });
            devUserSelector.style.display = 'block';
        } else if (role === 'trainer') {
            const trainers = state.getData('trainers');
            trainers.forEach(t => {
                const opt = document.createElement('option');
                opt.value = t.id;
                opt.textContent = t.name;
                devUserSelect.appendChild(opt);
            });
            devUserSelector.style.display = 'block';
        } else {
            devUserSelector.style.display = 'none';
        }
    }
    
    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('light-theme');
        themeToggleBtn.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
        showToast(isDark ? 'Switched to Light Theme' : 'Switched to Dark Theme', 'info');
    });
    
    // Sync external trigger changes back to dev toolbar
    window.addEventListener('statechanged', () => {
        // Highlight correct role button
        document.querySelectorAll('.dev-role-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-role') === state.currentRole);
        });
        
        // Sync user dropdown
        updateUserSelector(state.currentRole);
        if (state.currentUser && state.currentUser.id) {
            devUserSelect.value = state.currentUser.id;
        }
        
        renderApp();
    });
}

// --------------------------------------------------------------------------
// 11. Initial Entry Point Bootstrap
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Set up Dev toolbar handlers
    setupDeveloperToolbar();
    
    // Add mobile toggle menu behaviors
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu on links click
    mainNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });

    // Redirect logo click to Home
    document.getElementById('logoLink').addEventListener('click', (e) => {
        e.preventDefault();
        state.setRole('public');
    });
    
    // Trigger initial render
    renderApp();
});
