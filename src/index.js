import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 导入您的 App 组件
import './index.css'; // 确保这里正确导入了 Tailwind CSS 的主文件

// Create a root to render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
