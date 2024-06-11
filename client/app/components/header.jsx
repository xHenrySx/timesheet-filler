import { Link, useLocation } from '@remix-run/react';
import { Menubar } from 'primereact/menubar';

import '../styles/header.css';

const Header = () => {
  const location = useLocation();

  const itemRender = item => {
    return (
      <div className="flex">
        <i className={`${item.icon} nav-icon`}  style={{fontSize: '1.8rem'}}/>
        <Link
          to={item.url}
          className={`p-menuitem-link ${
            location.pathname === item.url ? ' active' : ''
          } header-item`}
        >
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
        src="https://sodep.com.py/wp-content/uploads/2023/06/sodep-logo_white-1.png"
        alt="Logo Sodep S.A."
        className="logo"
      />
    </Link>
  );

  return (
    <header>
      <Menubar model={items} start={start} style={{justifyContent: 'space-between'}} />
    </header>
  );
};

export default Header;
