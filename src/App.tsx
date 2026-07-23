import { Routes, Route } from 'react-router-dom';
import { ReadyProvider } from '@/context/ReadyContext';
import { OverlayProvider } from '@/context/OverlayContext';
import Layout from '@/components/layout/Layout';
import ScrollManager from '@/components/layout/ScrollManager';
import HomePage from '@/pages/HomePage';
import CollectionsPage from '@/pages/CollectionsPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <ReadyProvider>
      <OverlayProvider>
        <ScrollManager />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </OverlayProvider>
    </ReadyProvider>
  );
}
