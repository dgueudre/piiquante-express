import React, { useState } from 'react';

import { api } from './api';
import useForm from './hooks/useForm';

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: async ({ email, password }) => {
      setError(null);

      try {
        const data = await api.login(email, password);
        console.log('Login successful:', data);
        // Redirection ou actions supplémentaires ici
      } catch (error: any) {
        setError(error.message || 'An error occurred during login');
      }
    },
  });

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
