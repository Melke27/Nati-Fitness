import { useState } from 'react';
import { memberService, trainerService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function DevToolbar() {
  const { currentRole, currentUser, isLightTheme, setIsLightTheme, setRole, showToast } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const members = memberService.getAll();
  const trainers = trainerService.getAll();

  const handleRoleChange = (role) => {
    if (role === 'member') {
      const userId = selectedUserId || members[0]?.id;
      setRole('member', memberService.getById(userId));
      setSelectedUserId(userId);
    } else if (role === 'trainer') {
      const userId = selectedUserId || trainers[0]?.id;
      setRole('trainer', trainerService.getById(userId));
      setSelectedUserId(userId);
    } else if (role === 'admin') {
      setRole('admin', { name: 'System Administrator', role: 'admin' });
    } else {
      setRole('public', null);
    }
  };

  const handleUserChange = (userId) => {
    setSelectedUserId(userId);
    if (currentRole === 'member') {
      setRole('member', memberService.getById(userId));
    } else if (currentRole === 'trainer') {
      setRole('trainer', trainerService.getById(userId));
    }
  };

  return (
    <div className={`dev-toolbar${collapsed ? ' collapsed' : ''}`} id="devToolbar">
      <div className="dev-toolbar-header">
        <span>⚡ Portal Simulator</span>
        <button
          className="dev-toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle simulator controls"
        >
          {collapsed ? '▲' : '▼'}
        </button>
      </div>
      <div className="dev-toolbar-body" id="devToolbarBody">
        <p className="dev-hint">Quickly switch between views to explore all portal features:</p>
        <div className="dev-role-buttons">
          {['public', 'member', 'trainer', 'admin'].map((role) => (
            <button
              key={role}
              className={`dev-role-btn${currentRole === role ? ' active' : ''}`}
              onClick={() => handleRoleChange(role)}
            >
              {role === 'public' ? 'Public Site' : `${role.charAt(0).toUpperCase() + role.slice(1)} Portal`}
            </button>
          ))}
        </div>
        {(currentRole === 'member' || currentRole === 'trainer') && (
          <div className="dev-user-selector" id="devUserSelector">
            <label htmlFor="devUserSelect">Simulate User:</label>
            <select
              id="devUserSelect"
              value={currentUser?.id || selectedUserId}
              onChange={(e) => handleUserChange(e.target.value)}
            >
              {(currentRole === 'member' ? members : trainers).map((u) => (
                <option key={u.id} value={u.id}>
                  {currentRole === 'member' ? `${u.name} (${u.status.toUpperCase()})` : u.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="theme-switch-container">
          <span>Theme Mode</span>
          <button
            id="themeToggleBtn"
            className="theme-btn"
            onClick={() => {
              setIsLightTheme(!isLightTheme);
              showToast(isLightTheme ? 'Switched to Dark Theme' : 'Switched to Light Theme', 'info');
            }}
          >
            {isLightTheme ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}
