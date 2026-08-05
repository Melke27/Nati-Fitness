import { planService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function AdminPlanModal({ planId = null }) {
  const { closeModal, showToast, refresh } = useApp();
  const isEdit = planId !== null;
  const plan = isEdit
    ? planService.getById(planId)
    : { name: '', price: 0, duration: 'month', features: [], disabled: [] };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.pName.value,
      price: parseInt(form.pPrice.value, 10),
      features: form.pFeatures.value.split(',').map((f) => f.trim()).filter(Boolean),
    };

    if (isEdit) planService.update(planId, data);
    else planService.create(data);

    closeModal();
    showToast('Membership tier plan updated.', 'success');
    refresh();
  };

  return (
    <div>
      <h3>{isEdit ? 'Modify Membership Tier' : 'Add Membership Tier'}</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div className="form-group">
          <label>Tier Name</label>
          <input name="pName" type="text" className="form-control" defaultValue={plan.name} required />
        </div>
        <div className="form-group">
          <label>Subscription Fee ($)</label>
          <input name="pPrice" type="number" className="form-control" defaultValue={plan.price} required />
        </div>
        <div className="form-group">
          <label>Included Features (Comma Separated)</label>
          <textarea name="pFeatures" className="form-control" defaultValue={plan.features?.join(', ') || ''} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 15 }}>
          {isEdit ? 'Update Membership Tier' : 'Create Membership Tier'}
        </button>
      </form>
    </div>
  );
}
