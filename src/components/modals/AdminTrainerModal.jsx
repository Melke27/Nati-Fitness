import { trainerService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function AdminTrainerModal({ trainerId = null }) {
  const { closeModal, showToast, refresh } = useApp();
  const isEdit = trainerId !== null;
  const trainer = isEdit
    ? trainerService.getById(trainerId)
    : { name: '', role: '', bio: '', photo: '🏋️‍♂️' };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.tName.value,
      role: form.tRole.value,
      bio: form.tBio.value,
      photo: form.tPhoto.value,
    };

    if (isEdit) trainerService.update(trainerId, data);
    else trainerService.create(data);

    closeModal();
    showToast(isEdit ? 'Trainer coach profile saved.' : 'Trainer coach created.', 'success');
    refresh();
  };

  return (
    <div>
      <h3>{isEdit ? 'Modify Coach Profile' : 'Add Coach Staff File'}</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div className="form-group">
          <label>Coach Full Name</label>
          <input name="tName" type="text" className="form-control" defaultValue={trainer.name} required />
        </div>
        <div className="form-group">
          <label>Role/Specialization</label>
          <input name="tRole" type="text" className="form-control" defaultValue={trainer.role} placeholder="e.g. Strength & Conditioning" required />
        </div>
        <div className="form-group">
          <label>Short Bio Description</label>
          <textarea name="tBio" className="form-control" defaultValue={trainer.bio} required />
        </div>
        <div className="form-group">
          <label>Profile Avatar Icon</label>
          <select name="tPhoto" className="form-control" defaultValue={trainer.photo}>
            <option value="🏋️‍♂️">🏋️‍♂️ Weightlifter</option>
            <option value="🏃‍♀️">🏃‍♀️ Runner Female</option>
            <option value="🧘‍♂️">🧘‍♂️ Yoga Instructor</option>
            <option value="💪">💪 Flex Muscle</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 15 }}>Save Coach File</button>
      </form>
    </div>
  );
}
