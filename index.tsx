import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminPage from './components/Admin';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Simple routing based on URL search parameter to show the admin page
const isAdminRoute = new URLSearchParams(window.location.search).get('admin') === 'true';

root.render(
  <React.StrictMode>
    {isAdminRoute ? <AdminPage /> : <App />}
  </React.StrictMode>
);