import { memberService } from '../../services';
import { useApp } from '../../context/AppContext';
import WorkoutEditorModal from '../../components/modals/WorkoutEditorModal';
import MessagingModal from '../../components/modals/MessagingModal';

export default function TrainerDashboard() {
  const { currentUser, openModal, refreshKey } = useApp();
  const members = memberService.getByTrainer(currentUser.id);
  void refreshKey;

  return (
    <div className="portal-content-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Trainer Client Panel</h2>
        <span className="badge badge-active">{members.length} Active Clients</span>
      </div>
      <div className="glass-card">
        <h3>Assigned Gym Members</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
          Select a member to edit their routine, send messages, or schedule sessions.
        </p>
        <div className="table-container" style={{ marginTop: 20 }}>
          <table className="portal-table">
            <thead>
              <tr>
                <th>Client Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>No members currently assigned to you.</td></tr>
              ) : (
                members.map((m) => (
                  <tr key={m.id}>
                    <td><strong>{m.name}</strong></td>
                    <td>{m.email}</td>
                    <td>{m.phone}</td>
                    <td><span className={`badge badge-${m.status === 'active' ? 'active' : 'expired'}`}>{m.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => openModal(<WorkoutEditorModal memberId={m.id} />)}>Edit Routine</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => openModal(<MessagingModal trainerId={currentUser.id} memberId={m.id} />)}>Chat</button>
                      </div>
                    </td>
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
