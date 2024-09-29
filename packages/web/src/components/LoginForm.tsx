import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useMutationLogin } from '../hooks/tanstack/useMutationLogin';
import { ILoginPayload, loginSchema } from '../validations';

const defaultValues: ILoginPayload = {
  email: 'test@test.com',
  password: '@secured-password',
};

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input {...register('email')} />
          <p className="form-error">{errors.email?.message}&nbsp;</p>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input {...register('password')} />
          <p className="form-error">{errors.password?.message}&nbsp;</p>
        </div>

        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
