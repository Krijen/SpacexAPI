import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          
          <span className="logo-text">SPACE<span className="logo-accent">X</span></span>
          <span className="logo-sub">LAUNCH TRACKER</span>
        </Link>
        <div className="header-badge">
          <span className="badge-dot" />
          LIVE DATA
        </div>
      </div>
    </header>
  );
};

export default Header;
