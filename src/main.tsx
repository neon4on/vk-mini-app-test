import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import App from './App.tsx';
import '@vkontakte/vkui/dist/vkui.css';

import bridge from '@vkontakte/vk-bridge';

bridge.send('VKWebAppInit', {
  app_id: import.meta.env.VITE_APP_ID,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
