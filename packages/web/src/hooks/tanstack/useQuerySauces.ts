import { useQuery } from '@tanstack/react-query';

import { api } from '../../api';
import { useAuth } from '../../contexts/authContext';

export function useQuerySauces() {
  const { userId } = useAuth();

  return useQuery({
    queryKey: ['sauces'],
    queryFn: () => api.getAllSauces(),
    enabled: !!userId,
  });
}
