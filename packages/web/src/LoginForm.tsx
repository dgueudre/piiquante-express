import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMutationLogin } from './hooks/tanstack/useMutationLogin';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const resolver = zodResolver(schema);

const defaultValues: z.infer<typeof schema> = {
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
    resolver,
  });

  const loginMutation = useMutationLogin();

  const isSubmitting = loginMutation.isPending;

  const onSubmit = handleSubmit(({ email, password }) => {
    return loginMutation.mutate({ email, password });
  });

  console.log(errors);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input {...register('email')} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input {...register('password')} />
        </div>
        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
