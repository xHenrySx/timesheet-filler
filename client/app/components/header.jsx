import { Link, useLocation } from '@remix-run/react';
import { Menubar } from 'primereact/menubar';
import ThemeSelector from './themeselector';

import '../styles/header.css';

const Header = ({ theme, setTheme }) => {
  const location = useLocation();

  const itemRender = item => {
    return (
      <div className="flex">
        <Link
          to={item.url}
          className={`p-menuitem-link ${
            location.pathname === item.url ? ' active' : ''
          } header-item`}
        >
          <i className={`${item.icon} nav-icon`} style={{ fontSize: '1.8rem' }} />
          {item.label}
        </Link>
      </div>
    );
  };

  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      url: '/',
      template: itemRender,
    },
    {
      label: 'Leyendas',
      icon: 'pi pi-fw pi-book',
      url: '/labels',
      template: itemRender,
    },
    {
      label: 'Exportar',
      icon: 'pi pi-fw pi-file',
      url: '/export',
      template: itemRender,
    },
  ];

  const start = (
    <Link to="/" className="logo-container">
      <img
        id={`logo-${theme}`}
        src="https://sodep.com.py/wp-content/uploads/2023/06/sodep-logo_white-1.png"
        alt="Logo Sodep S.A."
        className="logo light"
      />
    </Link>
  );

  const end = <ThemeSelector theme={theme} setTheme={setTheme} />;

  return (
    <header>
      <Menubar model={items} start={start} end={end} />
    </header>
  );
};

export default Header;
