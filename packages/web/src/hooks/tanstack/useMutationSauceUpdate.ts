import { useMutation } from '@tanstack/react-query';

import { api } from '../../api';

export const useMutationSauceUpdate = () => {
  return useMutation({
    mutationFn: api.updateSauce,

    onSuccess: (result) => {
      console.log(result);

      console.log('Véhicule mis à jour avec succès');
    },

    onError: (err) => {
      console.log(err);

      console.log(
        'Echec lors de la mise à jour du véhicule, veuillez réessayer'
      );
    },
  });
};
