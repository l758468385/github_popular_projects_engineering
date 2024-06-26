import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/styles/index.css';
// import '@/out.scss'; //sass检查
// import '@/out.less'; //less检查
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Failed to find the root element');
}
