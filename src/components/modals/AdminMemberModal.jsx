import { memberService, trainerService, planService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function AdminMemberModal({ memberId = null }) {
  const { closeModal, showToast, refresh } = useApp();
  const trainers = trainerService.getAll();
  const plans = planService.getAll();
  const isEdit = memberId !== null;
  const member = isEdit
    ? memberService.getById(memberId)
    : { name: '', email: '', phone: '', planId: plans[0]?.id, trainerId: '', status: 'active', expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.mName.value,
      email: form.mEmail.value,
      phone: form.mPhone.value,
      trainerId: form.mTrainer.value,
      planId: form.mPlan.value,
      status: form.mStatus.value,
      expiryDate: form.mExpiry.value,
    };

    if (isEdit) {
      memberService.update(memberId, data);
    } else {
      memberService.create({
        ...data,
        password: 'password',
        startDate: new Date().toISOString().split('T')[0],
        barcode: `TRN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
        bio: 'New profile created by Admin.',
      });
    }

    closeModal();
    showToast(isEdit ? 'Member profile updated.' : 'New member created.', 'success');
    refresh();
  };

  return (
    <div>
      <h3>{isEdit ? 'Modify Member File' : 'Register New Facility Member'}</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div className="form-group">
          <label>Full Name</label>
          <input name="mName" type="text" className="form-control" defaultValue={member.name} required />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input name="mEmail" type="email" className="form-control" defaultValue={member.email} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input name="mPhone" type="text" className="form-control" defaultValue={member.phone || ''} />
        </div>
        <div className="form-group">
          <label>Assign Personal Trainer</label>
          <select name="mTrainer" className="form-control" defaultValue={member.trainerId || ''}>
            <option value="">None (Self Guided)</option>
            {trainers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Membership Tier Plan</label>
          <select name="mPlan" className="form-control" defaultValue={member.planId}>
            {plans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Contract Status</label>
          <select name="mStatus" className="form-control" defaultValue={member.status || 'active'}>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contract Expiry Date</label>
          <input name="mExpiry" type="date" className="form-control" defaultValue={member.expiryDate} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 15 }}>
          {isEdit ? 'Save Member Info' : 'Create Member Profile'}
        </button>
      </form>
    </div>
  );
}
