import { FC } from 'react';

import { ISauce } from '@piiquante/shared';

import { useMutationSauceUpdate } from '../hooks/tanstack/useMutationSauceUpdate';
import useForm from '../hooks/useForm';

export type SauceFormProps = {
  sauce: ISauce;
};

export const SauceForm: FC<SauceFormProps> = ({ sauce }) => {
  const { mutate } = useMutationSauceUpdate();

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: sauce,
    onSubmit: (sauce) => {
      mutate(sauce);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="manufacturer">Manufacturer</label>
        <input
          type="text"
          className="form-control"
          id="manufacturer"
          name="manufacturer"
          value={values.manufacturer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          rows={5}
          name="description"
          value={values.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <input type="file" accept="image/*" />
        <button mat-raised-button color="primary">
          ADD IMAGE
        </button>
        <img />
      </div>
      <div className="form-group">
        <label htmlFor="main-pepper">Main Pepper Ingredient</label>
        <input
          type="text"
          className="form-control"
          id="main-pepper"
          name="mainPepper"
          value={values.mainPepper}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="heat">Heat</label>
        <div className="heat-container">
          <input
            type="range"
            className="custom-range heat-range"
            min="1"
            max="10"
            id="heat"
            name="heat"
            value={values.heat}
            onChange={handleChange}
          />
          <input
            type="number"
            className="form-control heat-reading"
            name="heatValue"
            value={values.heat}
            onChange={handleChange}
          />
        </div>
      </div>
      <button mat-raised-button color="primary">
        SUBMIT
      </button>
    </form>
  );
};
