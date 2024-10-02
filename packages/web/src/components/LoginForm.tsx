import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ILoginPayload, loginSchema } from '@piiquante/shared';

import { useMutationLogin } from '../hooks/tanstack/useMutationLogin';
import './LoginForm.css';

const defaultValues: ILoginPayload = {
  email: 'test@test.com',
  password: '@secured-password',
};

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutationLogin();

  const isSubmitting = loginMutation.isPending;

  const onSubmit = handleSubmit(({ email, password }) => {
    return loginMutation.mutate({ email, password });
  });

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input {...register('email')} />
        <p className="form-error">{errors.email?.message}&nbsp;</p>

        <label htmlFor="password">Password:</label>
        <input {...register('password')} />
        <p className="form-error">{errors.password?.message}&nbsp;</p>

        <button type="submit" disabled={isSubmitting || !isValid}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
