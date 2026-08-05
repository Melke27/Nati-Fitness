import { planService } from '../../services';
import { useApp } from '../../context/AppContext';
import AdminPlanModal from '../../components/modals/AdminPlanModal';

export default function AdminPlans() {
  const { openModal, refreshKey } = useApp();
  const plans = planService.getAll();
  void refreshKey;

  return (
    <div className="portal-content-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Membership Plans Manager</h2>
        <button className="btn btn-primary btn-sm" onClick={() => openModal(<AdminPlanModal />)}>+ Add Membership Tier</button>
      </div>
      <div className="glass-card">
        <div className="table-container">
          <table className="portal-table">
            <thead>
              <tr><th>Tier Name</th><th>Cost / Price</th><th>Billing Duration</th><th>Benefits / Features Included</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td>${p.price}.00</td>
                  <td>Per {p.duration}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.features.join(', ')}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => openModal(<AdminPlanModal planId={p.id} />)}>Edit</button>
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
