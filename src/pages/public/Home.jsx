import { Link } from 'react-router-dom';
import { planService, trainerService } from '../../services';
import PlanCard from '../shared/PlanCard';
import { useApp } from '../../context/AppContext';
import RegisterModal from '../modals/RegisterModal';

export default function Home() {
  const { openModal } = useApp();
  const plans = planService.getAll();
  const trainers = trainerService.getAll();

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">Next-Gen Fitness Portal</span>
            <h1>Train Smarter.<br />Track Everything.</h1>
            <p>
              Triener combines elite gym facilities with a seamless digital portal — empowering members, trainers, and administrators with real-time progress tracking.
            </p>
            <div className="hero-cta-group">
              <button className="btn btn-primary" onClick={() => openModal(<RegisterModal />)}>Get Started</button>
              <Link to="/memberships" className="btn btn-secondary">Explore Plans</Link>
            </div>
          </div>
          <div className="hero-img-container">
            <div className="hero-visual-card">
              <div className="hero-stat-badge hero-stat-badge-1">
                <span style={{ fontSize: '1.5rem' }}>🔥</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>420 kcal</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Burn</div>
                </div>
              </div>
              <div className="hero-circle-svg">
                <div className="hero-inner-circle">
                  <h3>3,840</h3>
                  <span>Active Trieners Today</span>
                </div>
              </div>
              <div className="hero-stat-badge hero-stat-badge-2">
                <span style={{ fontSize: '1.5rem' }}>💪</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>12.4 Tons</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Lifted Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 0' }}>
        <div className="section-header">
          <h2>Where Fitness Meets Systems</h2>
          <p>We empower coaches, fitness influencers and gyms with digital products, SaaS tools, and scientific consultancy, so fitness works smarter, not harder.</p>
        </div>
        <div className="features-grid">
          <div className="glass-card feature-card">
            <div className="feature-icon">📈</div>
            <h3>Coaching Business & Social Growth</h3>
            <p>We help fitness professionals launch independent businesses and scale their personal brands through end-to-end social media management, strategic content creation, and optimized online coaching systems.</p>
          </div>
          <div className="glass-card feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Fitness Software & Automation</h3>
            <p>Smart tools that generate structured, science-based training and diet plans efficiently—built to scale coaching with consistency and control.</p>
          </div>
          <div className="glass-card feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Gym & Coach Consultancy</h3>
            <p>Science-based coach education, internal systems, and social media strategy designed to modernize gyms and fitness businesses.</p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 0' }}>
        <div className="section-header">
          <h2>Membership Plans</h2>
          <p>Transparent tiers designed to fit casual gym enthusiasts and elite competitive powerlifters alike.</p>
        </div>
        <div className="plans-grid">
          {plans.map((plan, idx) => (
            <PlanCard key={plan.id} plan={plan} index={idx} onSelect={() => openModal(<RegisterModal />)} />
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: '80px 0' }}>
        <div className="section-header">
          <h2>Our Elite Coaching Staff</h2>
          <p>Learn from certified, championship-winning professionals dedicated to structural safety and performance.</p>
        </div>
        <div className="trainers-grid">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="glass-card trainer-card">
              <div className="trainer-photo-mock">{trainer.photo}</div>
              <div className="trainer-info">
                <h3 className="trainer-name">{trainer.name}</h3>
                <div className="trainer-role">{trainer.role}</div>
                <p className="trainer-bio">{trainer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
