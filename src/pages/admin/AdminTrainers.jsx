import { trainerService } from '../../services';
import { useApp } from '../../context/AppContext';
import AdminTrainerModal from '../../components/modals/AdminTrainerModal';

export default function AdminTrainers() {
  const { openModal, showToast, refresh, refreshKey } = useApp();
  const trainers = trainerService.getAll();
  void refreshKey;

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      trainerService.delete(id);
      showToast('Trainer deleted successfully.', 'success');
      refresh();
    }
  };

  return (
    <div className="portal-content-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Trainer Coach Directory</h2>
        <button className="btn btn-primary btn-sm" onClick={() => openModal(<AdminTrainerModal />)}>+ Add New Trainer</button>
      </div>
      <div className="glass-card">
        <div className="table-container">
          <table className="portal-table">
            <thead>
              <tr><th>Photo</th><th>Name</th><th>Specialization</th><th>Bio</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {trainers.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontSize: '1.5rem' }}>{t.photo}</td>
                  <td><strong>{t.name}</strong></td>
                  <td>{t.role}</td>
                  <td style={{ maxWidth: 300, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.bio}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => openModal(<AdminTrainerModal trainerId={t.id} />)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
