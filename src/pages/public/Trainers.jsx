import { trainerService } from '../../services';

export default function Trainers() {
  const trainers = trainerService.getAll();

  return (
    <div className="container">
      <div className="section-header">
        <h2>Our Dedicated Fitness Coaches</h2>
        <p>Work 1-on-1 with experts to optimize nutrition, lifting mechanics, and metabolic conditioning.</p>
      </div>
      <div className="trainers-grid">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="glass-card trainer-card">
            <div className="trainer-photo-mock">{trainer.photo}</div>
            <div className="trainer-info">
              <h3 className="trainer-name">{trainer.name}</h3>
              <div className="trainer-role">{trainer.role}</div>
              <p className="trainer-bio">{trainer.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
