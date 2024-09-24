import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { MyApp } from './MyApp';
import { AppLayout } from './layouts/AppLayout';
import { ContactPage } from './pages/ContactPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <AppLayout>
          <Routes>
            <Route path="/" element={<MyApp />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
