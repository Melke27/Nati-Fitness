import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PortalLayout from '../../components/shared/PortalLayout';
import MemberDashboard from './MemberDashboard';
import MemberWorkoutPlan from './MemberWorkoutPlan';
import MemberPayments from './MemberPayments';
import MemberProfile from './MemberProfile';

const MENU = [
  { path: '/member/dashboard', label: '📊 Dashboard' },
  { path: '/member/workout-plan', label: '🏋️‍♂️ Workout Plan' },
  { path: '/member/payments', label: '💳 Payments & Receipts' },
  { path: '/member/profile', label: '👤 Edit Profile' },
];

export default function MemberPortal() {
  const { currentUser, currentRole } = useApp();
  if (currentRole !== 'member' || !currentUser) return <Navigate to="/" replace />;

  return (
    <PortalLayout user={currentUser} roleLabel="Member Portal" menuItems={MENU}>
      <Routes>
        <Route path="dashboard" element={<MemberDashboard />} />
        <Route path="workout-plan" element={<MemberWorkoutPlan />} />
        <Route path="payments" element={<MemberPayments />} />
        <Route path="profile" element={<MemberProfile />} />
        <Route path="*" element={<Navigate to="/member/dashboard" replace />} />
      </Routes>
    </PortalLayout>
  );
}
