export default function PlanCard({ plan, index, onSelect }) {
  return (
    <div className={`glass-card plan-card${index === 1 ? ' popular' : ''}`}>
      {index === 1 && <div className="popular-tag">Popular choice</div>}
      <div>
        <div className="plan-header">
          <h3 className="plan-name">{plan.name}</h3>
          <div className="plan-price">${plan.price}<span>/{plan.duration}</span></div>
        </div>
        <ul className="plan-features">
          {plan.features.map((f) => (
            <li key={f}><span className="plan-feature-bullet" />{f}</li>
          ))}
          {plan.disabled?.map((f) => (
            <li key={f} className="disabled"><span className="plan-feature-bullet" />{f}</li>
          ))}
        </ul>
      </div>
      <button
        className={`btn ${index === 1 ? 'btn-primary' : 'btn-secondary'} select-plan-btn`}
        style={{ width: '100%' }}
        onClick={onSelect}
      >
        Subscribe Now
      </button>
    </div>
  );
}
