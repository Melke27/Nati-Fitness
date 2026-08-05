import { useState } from 'react';
import { authService, planService } from '../../services';
import { useApp } from '../../context/AppContext';
import LoginModal from './LoginModal';

export default function RegisterModal() {
  const { setRole, closeModal, openModal, showToast } = useApp();
  const plans = planService.getAll();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [planId, setPlanId] = useState(plans[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const session = authService.register({ name, email, phone, planId });
    setRole(session.role, session.user);
    closeModal();
    showToast('Registration successful! Welcome!', 'success');
  };

  return (
    <div className="register-modal-wrapper">
      <h2 style={{ marginBottom: 24, textAlign: 'center' }}>Join Triener Fitness</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="regName">Full Name</label>
          <input type="text" id="regName" className="form-control" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="regEmail">Email Address</label>
          <input type="email" id="regEmail" className="form-control" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="regPhone">Phone Number</label>
          <input type="tel" id="regPhone" className="form-control" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="regPlan">Choose Plan</label>
          <select id="regPlan" className="form-control" value={planId} onChange={(e) => setPlanId(e.target.value)}>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>{p.name} - ${p.price}/{p.duration}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 10 }}>Register & Subscribe</button>
      </form>
      <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Already have an account?{' '}
        <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }} onClick={(e) => { e.preventDefault(); openModal(<LoginModal />); }}>
          Sign In
        </a>
      </div>
    </div>
  );
}
