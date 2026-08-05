import { useState } from 'react';
import { authService } from '../../services';
import { useApp } from '../../context/AppContext';
import RegisterModal from './RegisterModal';

export default function LoginModal() {
  const { setRole, closeModal, openModal, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [role, setLoginRole] = useState('member');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const session = authService.login({ email: email.trim(), password, role });
      setRole(session.role, session.user);
      closeModal();
      if (session.role === 'admin') showToast('Welcome, Administrator!', 'success');
      else if (session.role === 'trainer') showToast(`Welcome back, ${session.user.name}!`, 'success');
      else showToast(`Hello ${session.user.name}, welcome to your portal!`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="login-modal-wrapper">
      <h2 style={{ marginBottom: 24, textAlign: 'center' }}>Portal Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginEmail">Email Address</label>
          <input
            type="email"
            id="loginEmail"
            className="form-control"
            placeholder="member@example.com, or admin@triener.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            id="loginPassword"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ marginBottom: 30 }}>
          <label htmlFor="loginRole">Select Portal Role</label>
          <select id="loginRole" className="form-control" value={role} onChange={(e) => setLoginRole(e.target.value)}>
            <option value="member">Member Portal</option>
            <option value="trainer">Trainer Portal</option>
            <option value="admin">Admin Portal</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
      </form>
      <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Don&apos;t have an account?{' '}
        <a
          href="#"
          style={{ color: 'var(--primary)', fontWeight: 600 }}
          onClick={(e) => { e.preventDefault(); openModal(<RegisterModal />); }}
        >
          Register as a Member
        </a>
      </div>
    </div>
  );
}
