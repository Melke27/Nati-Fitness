import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="main-footer" id="mainFooter">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-icon">▲</span>
            <span className="logo-text">TRIENER</span>
          </div>
          <p className="footer-desc">
            Premium fitness, elite training, and seamless digital progress. Experience fitness tracking at the next level.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook">FB</a>
            <a href="#" className="social-icon" aria-label="Instagram">IG</a>
            <a href="#" className="social-icon" aria-label="Twitter">TW</a>
            <a href="#" className="social-icon" aria-label="YouTube">YT</a>
          </div>
        </div>
        <div className="footer-links-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/memberships">Memberships</Link></li>
            <li><Link to="/trainers">Trainers</Link></li>
          </ul>
        </div>
        <div className="footer-links-col">
          <h4>Support</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className="footer-links-col">
          <h4>Contact Info</h4>
          <p>📍 100 Elite Performance Way, Boston, MA</p>
          <p>📞 +1 (555) 793-7848</p>
          <p>✉️ membership@triener.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Triener Fitness Systems. All rights reserved.</p>
      </div>
    </footer>
  );
}
