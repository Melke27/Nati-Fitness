import { memberService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function MemberProfile() {
  const { currentUser, setCurrentUser, showToast, refresh } = useApp();
  const member = memberService.getById(currentUser.id) || currentUser;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = memberService.update(member.id, {
      name: form.profName.value,
      email: form.profEmail.value,
      phone: form.profPhone.value,
      bio: form.profBio.value,
    });
    setCurrentUser(updated);
    showToast('Profile updated successfully!', 'success');
    refresh();
  };

  return (
    <div className="portal-content-pane">
      <h2>Update Profile Details</h2>
      <div className="glass-card">
        <form id="memberProfileForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profName">Full Name</label>
            <input type="text" id="profName" name="profName" className="form-control" defaultValue={member.name} required />
          </div>
          <div className="form-group">
            <label htmlFor="profEmail">Email Address</label>
            <input type="email" id="profEmail" name="profEmail" className="form-control" defaultValue={member.email} required />
          </div>
          <div className="form-group">
            <label htmlFor="profPhone">Phone Number</label>
            <input type="text" id="profPhone" name="profPhone" className="form-control" defaultValue={member.phone || ''} />
          </div>
          <div className="form-group">
            <label htmlFor="profBio">Personal Bio / Goals</label>
            <textarea id="profBio" name="profBio" className="form-control" defaultValue={member.bio || ''} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }}>Save Profile Details</button>
        </form>
      </div>
    </div>
  );
}
