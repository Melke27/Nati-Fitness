export default function About() {
  return (
    <div className="container">
      <div className="section-header">
        <h2>About Triener</h2>
        <p>Pioneering the future of physical and digital physical conditioning.</p>
      </div>
      <div className="about-grid">
        <div className="glass-card" style={{ padding: 40 }}>
          <h3>Established in 2026</h3>
          <p style={{ marginBottom: 20 }}>
            Triener was founded on a simple premise: physical training should not be disconnected from digital metrics. We provide state-of-the-art weights, platforms, and machines integrated with an intelligent portal platform where coach modifications propagate instantly.
          </p>
          <p>We boast over 40,000 sq ft of space including dedicated powerlifting platforms, high-intensity aerobic areas, and a recovery spa.</p>
          <div className="about-features">
            {[
              ['Olympic Lifters Paradise', '12 Eleiko barbell stations.'],
              ['Integrated Portal Coaching', 'Real-time workout delivery.'],
              ['Recovery Suite', 'Cryotherapy chambers and dry saunas.'],
            ].map(([title, desc]) => (
              <div key={title} className="about-feature-item">
                <span className="about-feature-check">✓</span>
                <div><strong>{title}</strong>: {desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            ['24/7', 'Facility Access for Elite & VIP Members', 'var(--primary)'],
            ['15+', 'Certified Specialized Fitness Trainers', 'var(--info)'],
            ['99%', 'Client Goal Achievement Rate', 'var(--success)'],
          ].map(([val, label, color]) => (
            <div key={label} className="glass-card" style={{ textAlign: 'center', padding: 30 }}>
              <h4 style={{ fontSize: '3rem', color }}>{val}</h4>
              <p style={{ color: 'var(--text-muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
