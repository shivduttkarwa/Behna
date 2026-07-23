import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Third-party global styles (loaded once, app-wide)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'remixicon/fonts/remixicon.css';

// App global styles (order matters: tokens → base)
import './styles/tokens.css';
import './styles/base.css';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
