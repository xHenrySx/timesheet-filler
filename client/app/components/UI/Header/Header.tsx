import { Link, useLocation } from "@remix-run/react";

import useThemeContext from "../../../context/ThemeContext/useThemeContext";

import { Menubar } from "primereact/menubar";

import ThemeSelector from "./ThemeSelector";

import "../../../styles/header.css";

import { MenuItem } from "primereact/menuitem";

const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useThemeContext();

  const itemRender = (item: MenuItem): React.ReactNode => {
    if (!item.url) return null;

    return (
      <Link
        to={item.url}
        className={`p-menuitem-link ${
          location.pathname === item.url ? " active" : ""
        } header-item`}
        style={{alignItems: 'baseline', gap: '0.5rem'}}
      >
        <i className={`${item.icon}`} style={{fontSize: '1.7rem'}} />
        <span>{item.label}</span>
      </Link>
    );
  };

  const items: MenuItem[] = [
    {
      label: "Inicio",
      icon: "pi pi-home",
      url: "/",
      template: itemRender,
    },
    {
      label: "Leyendas",
      icon: "pi pi-book",
      url: "/labels",
      template: itemRender,
    },
    {
      label: "Exportar",
      icon: "pi pi-file",
      url: "/export",
      template: itemRender,
    },
  ];

  const start = (
    <Link to="/" className="logo-container">
      <img
        id={`logo-${theme}`}
        src="https://sodep.com.py/wp-content/uploads/2023/06/sodep-logo_white-1.png"
        alt="Logo Sodep S.A."
        className="logo light aspect-auto"
      />
    </Link>
  );

  const end = <ThemeSelector theme={theme} setTheme={setTheme} />;

  return <Menubar model={items} start={start} end={end} />;
};

export default Header;
