import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PortalLayout from '../../components/shared/PortalLayout';
import AdminDashboard from './AdminDashboard';
import AdminMembers from './AdminMembers';
import AdminTrainers from './AdminTrainers';
import AdminPlans from './AdminPlans';

const MENU = [
  { path: '/admin/dashboard', label: '📊 Dashboard Metrics' },
  { path: '/admin/members', label: '👥 Members Mgmt' },
  { path: '/admin/trainers', label: '🏋️‍♂️ Trainers Mgmt' },
  { path: '/admin/plans', label: '💳 Membership Plans' },
];

export default function AdminPortal() {
  const { currentUser, currentRole } = useApp();
  if (currentRole !== 'admin' || !currentUser) return <Navigate to="/" replace />;

  return (
    <PortalLayout user={currentUser} roleLabel="Administrator" menuItems={MENU}>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="members" element={<AdminMembers />} />
        <Route path="trainers" element={<AdminTrainers />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </PortalLayout>
  );
}
