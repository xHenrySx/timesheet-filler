import {Link, useLocation} from "@remix-run/react";

const Navigation = () => {
  const location = useLocation()
  return (
    <nav className="navigation">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        Inicio
      </Link>
      <Link to="/labels" className={location.pathname === "/labels" ? "active" : ""}>
        Leyendas
      </Link>
      <Link to="/export" className={location.pathname === "/export" ? "active" : ""}>
        Exportar
      </Link>
    </nav>
  )
}

export default Navigation