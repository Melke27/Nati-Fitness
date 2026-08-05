import { planService } from '../../services';
import PlanCard from '../../components/shared/PlanCard';
import { useApp } from '../../context/AppContext';
import RegisterModal from '../../components/modals/RegisterModal';

export default function Memberships() {
  const { openModal } = useApp();
  const plans = planService.getAll();

  return (
    <div className="container">
      <div className="section-header">
        <h2>Select Your Membership Level</h2>
        <p>Simple pricing with no hidden enrollment charges. Upgrade or downgrade at any time.</p>
      </div>
      <div className="plans-grid">
        {plans.map((plan, idx) => (
          <PlanCard key={plan.id} plan={plan} index={idx} onSelect={() => openModal(<RegisterModal />)} />
        ))}
      </div>
    </div>
  );
}
