import { useQuery } from '@tanstack/react-query';

import { api } from '../../api';

export function useQuerySauces() {
  return useQuery({
    queryKey: ['sauces'],
    queryFn: () => api.getAllSauces(),
    staleTime: 30 * 1000,
  });
}
