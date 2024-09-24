import { useMutation } from '@tanstack/react-query';

import { ILoginForm } from '@piiquante/shared';

import { api } from '../../api';

function useMutationLogin({ email, password }: ILoginForm) {
  const mutation = useMutation({
    mutationFn: () => api.login(email, password),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
