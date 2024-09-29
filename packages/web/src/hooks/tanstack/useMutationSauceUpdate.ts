import { useMutation } from '@tanstack/react-query';

import { ISaucePayload } from '@piiquante/shared';

import { api } from '../../api';

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
