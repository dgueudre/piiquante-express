import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuth } from './contexts/authContext';
import { AppLayout } from './layouts/AppLayout';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SauceModifyPage } from './pages/SauceModifyPage';
import { SaucePage } from './pages/SaucePage';
import { SaucesPage } from './pages/SaucesPage';

export const AppRouter = () => {
  const { userId } = useAuth();
  return (
    <BrowserRouter basename="/">
      <AppLayout>
        <Routes>
          <Route path="/" element={userId ? <SaucesPage /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sauces/:id" element={<SaucePage />} />
          <Route path="/sauces/:id/edit" element={<SauceModifyPage />} />
          <Route path="/sauces" element={<SaucesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
