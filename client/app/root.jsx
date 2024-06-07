import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import styles from './styles/index.css?url';
import Header from './components/header';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
export function meta() {
  return [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { title: 'Timesheet Filler' },
    {
      name: 'description',
      content: 'A simple app to fill activities in Sodeppp',
    },
    { name: 'theme-color', content: '#390faf' },
  ];
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://csstools.github.io/normalize.css/11.0.0/normalize.css',
    },
    {
      rel: 'stylesheet',
      href: styles,
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Radio+Canada+Big:ital,wght@0,400..700;1,400..700&display=swap',
    },
    {
      name: 'icon',
      href: './favicon.ico',
    },
  ];
}

function App() {
  return (
    <PrimeReactProvider>
      <Document>
        <Outlet />
      </Document>
    </PrimeReactProvider>
  );
}

export default App;

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
