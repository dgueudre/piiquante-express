import { useMutation } from '@tanstack/react-query';

import { ILoginForm } from '@piiquante/shared';

import { api } from '../../api';
import { useAuth } from '../../contexts/authContext';

export function useMutationLogin() {
  const { onLogin } = useAuth();

  return useMutation({
    mutationFn: ({ email, password }: ILoginForm) => api.login(email, password),
    onSuccess: (data) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] });

      onLogin(data.token);
    },
  });
}
