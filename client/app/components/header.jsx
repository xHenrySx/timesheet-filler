import { Link } from '@remix-run/react';
import Navigation from './navigation';

const Header = () => {
  return (
    <header className="header">
      <div className="barra">
        <Link to="/" className="logo">
          <img
            src="https://sodep.com.py/wp-content/uploads/2023/06/sodep-logo_white-1.png"
            alt="Logo Sodep S.A."
          />
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
