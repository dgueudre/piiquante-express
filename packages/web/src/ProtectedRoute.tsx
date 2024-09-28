import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from './contexts/authContext';

export const ProtectedRoute: FC<{ el: JSX.Element }> = ({ el }) => {
  const { userId } = useAuth();

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return el;
};
