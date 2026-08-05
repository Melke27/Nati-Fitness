import { attendanceService, memberService, paymentService, planService, trainerService } from '../../services';
import { useApp } from '../../context/AppContext';
import MessagingModal from '../../components/modals/MessagingModal';

export default function MemberDashboard() {
  const { currentUser, showToast, openModal, refresh, refreshKey } = useApp();
  const member = memberService.getById(currentUser.id) || currentUser;
  const plans = planService.getAll();
  const myPlan = plans.find((p) => p.id === member.planId) || { name: 'No Plan' };
  const myTrainer = trainerService.getById(member.trainerId) || { name: 'Self Guided Training' };
  const attendance = attendanceService.getByMemberId(member.id);
  void refreshKey;

  const handleCheckIn = () => {
    try {
      attendanceService.checkIn(member.id);
      showToast('Success! Reception gate unlocked. Access Granted.', 'success');
      refresh();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="portal-content-pane">
      <h2>Member Dashboard</h2>
      <div className="stat-grid">
        <div className="glass-card stat-card">
          <div className="stat-title">Membership Status</div>
          <div className="stat-value" style={{ fontSize: '1.8rem', color: member.status === 'active' ? 'var(--success)' : 'var(--danger)' }}>
            {member.status.toUpperCase()}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Plan: {myPlan.name}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-title">Attendance</div>
          <div className="stat-value">{attendance.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total visits logged</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-title">Expiry Date</div>
          <div className="stat-value" style={{ fontSize: '1.6rem' }}>{member.expiryDate}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Renews automatically</div>
        </div>
      </div>

      <div className="portal-layout" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
        <div className="glass-card">
          <h3>Facility Quick Access</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '8px 0 24px 0' }}>
            Use the digital card or QR code simulator to check-in at reception.
          </p>
          <div className="barcode-card-container">
            <div className="barcode-card">
              <div className="barcode-logo">▲ TRIENER FITNESS</div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'left' }}>{member.name}</div>
              <div style={{ fontSize: '0.8rem', textAlign: 'left', color: '#64748b', marginTop: 4 }}>ID: {member.id}</div>
              <div className="barcode-lines" />
              <div className="barcode-number">{member.barcode}</div>
            </div>
            <button className="btn btn-primary" onClick={handleCheckIn}>Simulate QR Check-In</button>
          </div>
        </div>

        <div className="glass-card">
          <h3>Your Coach</h3>
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div className="portal-user-avatar" style={{ width: 80, height: 80, fontSize: '2rem', background: 'rgba(var(--primary-rgb), 0.1)', border: '2px solid var(--primary)', color: '#fff', margin: '0 auto' }}>
              {myTrainer.photo || '🤝'}
            </div>
            <h4 style={{ margin: '16px 0 8px 0' }}>{myTrainer.name}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase' }}>{myTrainer.role || ''}</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: 12 }}>{myTrainer.bio || 'Consult reception to select a personal training coach.'}</p>
          </div>
          {member.trainerId && (
            <button
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={() => openModal(<MessagingModal trainerId={member.trainerId} memberId={member.id} />)}
            >
              Message Coach
            </button>
          )}
        </div>
      </div>

      <div className="glass-card">
        <h3>Recent Attendance</h3>
        <div className="table-container" style={{ marginTop: 16 }}>
          <table className="portal-table">
            <thead>
              <tr><th>Date</th><th>Time</th><th>Status</th></tr>
            </thead>
            <tbody>
              {attendance.length === 0 ? (
                <tr><td colSpan={3} style={{ textAlign: 'center' }}>No recent check-ins found.</td></tr>
              ) : (
                attendance.slice(-3).reverse().map((a) => (
                  <tr key={a.id}>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td><span className="badge badge-active">Verified</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
