import { useState } from 'react';
import { memberService, trainerService, workoutService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function MemberWorkoutPlan() {
  const { currentUser, showToast, refreshKey } = useApp();
  const member = memberService.getById(currentUser.id) || currentUser;
  const myTrainer = trainerService.getById(member.trainerId) || { name: 'Self Guided Training' };
  const plan = workoutService.getByMemberId(member.id);
  const [doneExercises, setDoneExercises] = useState({});
  void refreshKey;

  const toggleExercise = (key) => {
    setDoneExercises((prev) => {
      const next = !prev[key];
      if (next) showToast('Exercise marked completed!', 'success');
      return { ...prev, [key]: next };
    });
  };

  return (
    <div className="portal-content-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Your Custom Workout Plan</h2>
        <span className="badge badge-active">Assigned by {myTrainer.name}</span>
      </div>
      <div className="glass-card">
        {plan?.days?.length ? (
          plan.days.map((day, dIdx) => (
            <div key={dIdx} className="workout-day-block">
              <h3 className="workout-day-title">{day.day}</h3>
              <div className="exercise-list">
                {day.exercises.map((ex, eIdx) => {
                  const key = `${dIdx}-${eIdx}`;
                  const isDone = doneExercises[key];
                  return (
                    <div key={key} className="exercise-item">
                      <div>
                        <div className="exercise-name">{ex.name}</div>
                        <div className="exercise-details">
                          {ex.sets} Sets x {ex.reps} Reps {ex.weight ? `• Weight: ${ex.weight} lbs` : ''}
                        </div>
                      </div>
                      <div className="exercise-actions">
                        <button
                          className={`btn btn-sm ${isDone ? 'btn-primary' : 'btn-secondary'}`}
                          onClick={() => toggleExercise(key)}
                        >
                          {isDone ? '✓ Done' : 'Mark Done'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
            <p>No workout plan has been assigned to you yet.</p>
            <p style={{ fontSize: '0.9rem', marginTop: 8 }}>If you have a personal trainer, request them to write one in their portal.</p>
          </div>
        )}
      </div>
    </div>
  );
}
