import { useEffect } from 'react';

import LoginForm from './LoginForm';
import { api } from './api';
import { useQuerySauces } from './hooks/tanstack/useQuerySauces';

export function MyApp() {
  const { data: sauces } = useQuerySauces();

  useEffect(() => {
    api.login('test@test.com', '@secured-password');
  }, []);
  return (
    <>
      <LoginForm />
      {sauces?.map((sauce) => <p key={sauce._id}>{sauce.name}</p>)}
    </>
  );
}
