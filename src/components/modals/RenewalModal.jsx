import { planService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function RenewalModal({ member, onSuccess }) {
  const { closeModal, showToast } = useApp();
  const plans = planService.getAll();

  const handleSubmit = (e) => {
    e.preventDefault();
    const planId = e.target.renewPlan.value;
    const updated = onSuccess(planId);
    closeModal();
    const plan = plans.find((p) => p.id === planId);
    showToast(`Success! Your membership has been updated to ${plan?.name}.`, 'success');
    return updated;
  };

  return (
    <div style={{ padding: 10 }}>
      <h3>Renew / Upgrade Membership</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 8 }}>
        Select your desired tier and confirm your subscription payment details.
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <div className="form-group">
          <label htmlFor="renewPlan">Select Plan</label>
          <select id="renewPlan" name="renewPlan" className="form-control" defaultValue={member.planId}>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>{p.name} - ${p.price}/mo</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Card Information</label>
          <input type="text" className="form-control" defaultValue="4111 2222 3333 4444" required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label>Expiry Date</label>
            <input type="text" className="form-control" defaultValue="12/29" required />
          </div>
          <div className="form-group">
            <label>CVC Code</label>
            <input type="text" className="form-control" defaultValue="123" required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 15 }}>Confirm Payment</button>
      </form>
    </div>
  );
}
