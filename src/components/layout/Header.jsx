import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import LoginModal from '../modals/LoginModal';

const PUBLIC_LINKS = [
  { text: 'Home', path: '/' },
  { text: 'About', path: '/about' },
  { text: 'Memberships', path: '/memberships' },
  { text: 'Trainers', path: '/trainers' },
  { text: 'FAQ', path: '/faq' },
  { text: 'Gallery', path: '/gallery' },
  { text: 'Blog', path: '/blog' },
  { text: 'Contact', path: '/contact' },
];

export default function Header() {
  const { currentRole, currentUser, logout, openModal } = useApp();

  return (
    <header className="main-header" id="mainHeader">
      <div className="container header-container">
        <Link to="/" className="logo" id="logoLink">
          <span className="logo-icon">▲</span>
          <span className="logo-text">TRIENER</span>
        </Link>

        <nav className="main-nav" id="mainNav">
          {currentRole === 'public' ? (
            PUBLIC_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="nav-link">
                {link.text}
              </Link>
            ))
          ) : (
            <span className="portal-header-tag">
              {currentRole.toUpperCase()} PORTAL - Welcome, {currentUser?.name}
            </span>
          )}
        </nav>

        <div className="nav-actions" id="navActions">
          {currentRole === 'public' ? (
            <button className="btn btn-primary btn-sm" onClick={() => openModal(<LoginModal />)}>
              Portal Login
            </button>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={logout}>
              Logout
            </button>
          )}
        </div>

        <button className="mobile-menu-toggle" id="menuToggle" aria-label="Toggle navigation menu">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
    </header>
  );
}
