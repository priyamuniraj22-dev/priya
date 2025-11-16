import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add a simple error boundary to catch any rendering errors
try {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    console.error('Root element not found');
  }
} catch (error) {
  console.error('Error rendering app:', error);
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial;"><h1>Error Loading Application</h1><p>Please check the console for more details.</p></div>';
}