import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';

const AppContext = createContext(null);

const ROLE_ROUTES = {
  public: '/',
  member: '/member/dashboard',
  trainer: '/trainer/dashboard',
  admin: '/admin/dashboard',
};

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState('public');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    storageService.seedDatabase();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light-theme', isLightTheme);
    document.body.classList.toggle('portal-active', currentRole !== 'public');
  }, [isLightTheme, currentRole]);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3300);
  }, []);

  const openModal = useCallback((content) => setModal(content), []);
  const closeModal = useCallback(() => setModal(null), []);

  const setRole = useCallback(
    (role, user = null) => {
      setCurrentRole(role);
      setCurrentUser(user);
      navigate(ROLE_ROUTES[role] || '/');
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setRole('public', null);
    showToast('Logged out successfully', 'info');
  }, [setRole, showToast]);

  const value = useMemo(
    () => ({
      currentRole,
      currentUser,
      isLightTheme,
      modal,
      toasts,
      refreshKey,
      setRole,
      logout,
      setCurrentUser,
      setIsLightTheme,
      showToast,
      openModal,
      closeModal,
      refresh,
    }),
    [
      currentRole,
      currentUser,
      isLightTheme,
      modal,
      toasts,
      refreshKey,
      setRole,
      logout,
      showToast,
      openModal,
      closeModal,
      refresh,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
