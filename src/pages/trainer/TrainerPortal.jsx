import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PortalLayout from '../../components/shared/PortalLayout';
import TrainerDashboard from './TrainerDashboard';

const MENU = [{ path: '/trainer/dashboard', label: '👥 My Members' }];

export default function TrainerPortal() {
  const { currentUser, currentRole } = useApp();
  if (currentRole !== 'trainer' || !currentUser) return <Navigate to="/" replace />;

  return (
    <PortalLayout user={currentUser} roleLabel="Trainer Portal" menuItems={MENU}>
      <Routes>
        <Route path="dashboard" element={<TrainerDashboard />} />
        <Route path="*" element={<Navigate to="/trainer/dashboard" replace />} />
      </Routes>
    </PortalLayout>
  );
}
