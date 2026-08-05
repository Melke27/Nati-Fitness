import { useApp } from '../../context/AppContext';

export default function Modal() {
  const { modal, closeModal } = useApp();

  if (!modal) return null;

  return (
    <div
      className="modal-backdrop"
      style={{ display: 'flex' }}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="modal-container">
        <button className="modal-close" onClick={closeModal} aria-label="Close modal">
          &times;
        </button>
        <div className="modal-content">{modal}</div>
      </div>
    </div>
  );
}
