import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ISauceEntity } from '@piiquante/shared';

import { useMutationSauceUpdate } from '../hooks/tanstack/useMutationSauceUpdate';
import { ISaucePayload, sauceSchema } from '../validations';

export type SauceFormProps = {
  sauce: ISauceEntity;
};

export const SauceForm: FC<SauceFormProps> = ({ sauce }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISaucePayload>({
    defaultValues: sauce,
    resolver: zodResolver(sauceSchema),
  });

  const sauceUpdateMutation = useMutationSauceUpdate();

  const isSubmitting = sauceUpdateMutation.isPending;

  const onSubmit = handleSubmit((newSauce) => {
    return sauceUpdateMutation.mutate({ id: sauce._id, sauce: newSauce });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input {...register('name')} />
      </div>
      <div className="form-group">
        <label htmlFor="manufacturer">Manufacturer</label>
        <input {...register('manufacturer')} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea {...register('description')}></textarea>
      </div>
      <div className="form-group">
        <input type="file" accept="image/*" />
        <button color="primary">ADD IMAGE</button>
        <img />
      </div>
      <div className="form-group">
        <label htmlFor="main-pepper">Main Pepper Ingredient</label>
        <input {...register('mainPepper')} />
      </div>
      <div className="form-group">
        <label htmlFor="heat">Heat</label>
        <div className="heat-container">
          <input type="range" {...register('heat')} />
          <input {...register('heat')} />
        </div>
      </div>
      <button type="submit" disabled={isSubmitting}>
        SUBMIT
      </button>
    </form>
  );
};
