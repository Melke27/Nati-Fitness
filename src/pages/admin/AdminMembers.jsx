import { memberService, trainerService } from '../../services';
import { useApp } from '../../context/AppContext';
import AdminMemberModal from '../../components/modals/AdminMemberModal';

export default function AdminMembers() {
  const { openModal, showToast, refresh, refreshKey } = useApp();
  const members = memberService.getAll();
  const trainers = trainerService.getAll();
  void refreshKey;

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gym member? This action is irreversible.')) {
      memberService.delete(id);
      showToast('Member deleted successfully.', 'success');
      refresh();
    }
  };

  return (
    <div className="portal-content-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gym Member Directory</h2>
        <button className="btn btn-primary btn-sm" onClick={() => openModal(<AdminMemberModal />)}>+ Create New Member</button>
      </div>
      <div className="glass-card">
        <div className="table-container">
          <table className="portal-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Trainer</th><th>Status</th><th>Contract Expiry</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const trainerObj = trainers.find((t) => t.id === m.trainerId) || { name: 'None' };
                return (
                  <tr key={m.id}>
                    <td><strong>{m.name}</strong></td>
                    <td>{m.email}</td>
                    <td>{trainerObj.name}</td>
                    <td><span className={`badge badge-${m.status === 'active' ? 'active' : 'expired'}`}>{m.status}</span></td>
                    <td>{m.expiryDate}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => openModal(<AdminMemberModal memberId={m.id} />)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
