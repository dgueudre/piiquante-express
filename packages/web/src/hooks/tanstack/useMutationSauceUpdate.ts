import { useMutation } from '@tanstack/react-query';

import { api } from '../../api';
import { ISauceWithFilePayload } from '../../components/sauceWithFileSchema';

export const useMutationSauceUpdate = () => {
  return useMutation({
    mutationFn: ({ id, sauce }: { id: string; sauce: ISauceWithFilePayload }) =>
      api.updateSauce(id, sauce),
    onSuccess: (data) => {
      console.log(data);

      console.log('MAJ OK');
    },
    onError: (err) => {
      console.log(err);

      console.log('Echec');
    },
  });
};
