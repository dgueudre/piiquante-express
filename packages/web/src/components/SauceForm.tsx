import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { ISauceEntity } from '@piiquante/shared';

import { useMutationSauceUpdate } from '../hooks/tanstack/useMutationSauceUpdate';
import {
  ISauceWithFilePayload,
  sauceWithFileSchema,
} from './sauceWithFileSchema';

export type SauceFormProps = {
  sauce: ISauceEntity;
};

export const SauceForm: FC<SauceFormProps> = ({ sauce }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISauceWithFilePayload>({
    defaultValues: sauce,
    resolver: zodResolver(sauceWithFileSchema),
  });

  const sauceUpdateMutation = useMutationSauceUpdate();

  const isSubmitting = sauceUpdateMutation.isPending;

  const onSubmit = handleSubmit((newSauce) => {
    return sauceUpdateMutation.mutate({ id: sauce._id, sauce: newSauce });
  });

  if (sauceUpdateMutation.isSuccess) {
    return <Navigate to={'/sauces'} />;
  }

  const files = watch('file');
  const file = files?.[0];
  const fileUrl = file ? URL.createObjectURL(file) : sauce.imageUrl;

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
        <input {...register('file')} type="file" accept="image/*" />
        <img src={fileUrl} alt="" />
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
