import { useMutation } from '@tanstack/react-query';

import { api } from '../../api';
import { ISaucePayload } from '../../validations';

export const useMutationSauceUpdate = () => {
  return useMutation({
    mutationFn: ({ id, sauce }: { id: string; sauce: ISaucePayload }) =>
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
