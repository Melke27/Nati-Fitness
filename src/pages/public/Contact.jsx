import { useApp } from '../../context/AppContext';

export default function Contact() {
  const { showToast } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Thank you! Our support staff will contact you shortly.', 'success');
    e.target.reset();
  };

  return (
    <div className="container">
      <div className="section-header">
        <h2>Contact Our Team</h2>
        <p>Reach out to address questions, billing inquiries, or private trainer requests.</p>
      </div>
      <div className="contact-grid">
        <div className="contact-info-card">
          {[
            ['📍', 'Our Location', '100 Elite Performance Way, Boston, MA 02110'],
            ['📞', 'Phone Support', '+1 (555) 793-7848\nMon-Sun: 6:00 AM - 10:00 PM'],
            ['✉️', 'Email Inquiries', 'membership@triener.com\nsupport@triener.com'],
          ].map(([icon, title, text]) => (
            <div key={title} className="glass-card contact-item">
              <div className="contact-icon">{icon}</div>
              <div>
                <h4>{title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card">
          <h3>Send a Message</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <div className="form-group">
              <label htmlFor="contactName">Full Name</label>
              <input type="text" id="contactName" className="form-control" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Email Address</label>
              <input type="email" id="contactEmail" className="form-control" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="contactMessage">Your Message</label>
              <textarea id="contactMessage" className="form-control" placeholder="Enter your inquiry..." required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
