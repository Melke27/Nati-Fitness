import { NavLink, useLocation } from 'react-router-dom';

export default function PortalLayout({ user, roleLabel, menuItems, children }) {
  const location = useLocation();

  return (
    <div className="container portal-layout">
      <div className="portal-sidebar">
        <div className="portal-user-info">
          <div className="portal-user-avatar">{user.name.charAt(0)}</div>
          <h3 className="portal-user-name">{user.name}</h3>
          <span className="portal-user-role">{roleLabel}</span>
        </div>
        <ul className="portal-menu">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`portal-menu-item${location.pathname === item.path ? ' active' : ''}`}
            >
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="portal-content">{children}</div>
    </div>
  );
}
