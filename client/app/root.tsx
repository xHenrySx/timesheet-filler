import { Links, Meta, Outlet, Scripts } from "@remix-run/react";

import { PrimeReactProvider } from "primereact/api";
import ThemeProvider from "./context/ThemeContext/ThemeProvider";

import styles from "./styles/index.css?url";
import tailwind from "./styles/tailwind.css?url"
import "primeicons/primeicons.css";

import Header from "./components/UI/Header/Header";

import type { ReactElement} from "react";

import useThemeContext from "./context/ThemeContext/useThemeContext";

export function meta() {
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "Timesheet Filler" },
    {
      name: "description",
      content: "A simple app to fill activities in Sodeppp",
    },
    { name: "theme-color", content: "#390faf" },
  ];
}

export function links() {
  return [
    {
      rel: "preload",
      as: "style",
      href: "https://unpkg.com/@csstools/normalize.css",
    },
    {
      rel: "stylesheet",
      href: "https://unpkg.com/@csstools/normalize.css",
    },
    {
      rel: "preload",
      as: "style",
      href: tailwind,
    },
    {
      rel: "stylesheet",
      href: tailwind,
    },
    {
      rel: "preload",
      as: "style",
      href: styles,
    },
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "preload",
      as: "style",
      href: "https://fonts.googleapis.com/css2?family=Radio+Canada+Big:ital,wght@0,400..700;1,400..700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Radio+Canada+Big:ital,wght@0,400..700;1,400..700&display=swap",
    },
    {
      name: "icon",
      href: "./favicon.ico",
    },
  ];
}

function App() {
  return (
    <PrimeReactProvider>
      <ThemeProvider>
        <Document>
          <Outlet />
        </Document>
      </ThemeProvider>
    </PrimeReactProvider>
  );
}

export default App;

interface DocumentProps {
  children: ReactElement;
}

function Document({ children }: DocumentProps) {
  const { theme } = useThemeContext();
  
  if (!theme) return <div>Cargando... AGUANTA</div>
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
        {<link rel="preload" href={`/themes/${theme}/theme.css`} as="style" />}
        {theme && (
          <link
            id={`${theme}-link`}
            rel="stylesheet"
            href={`/themes/${theme}/theme.css`}
          />
        )}
      </head>
      <body>
        <Header />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
