import { useApp } from '../../context/AppContext';

const ICONS = { success: '✅', error: '❌', info: 'ℹ️', default: '🔔' };

export default function ToastContainer() {
  const { toasts } = useApp();

  return (
    <div className="toast-container" id="toastContainer">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span>{ICONS[toast.type] || ICONS.default}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
