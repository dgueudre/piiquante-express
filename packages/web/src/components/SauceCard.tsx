import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ISauceEntity } from '@piiquante/shared';

import './SauceCard.css';

type SauceCardProps = {
  sauce: ISauceEntity;
};

export const SauceCard: FC<SauceCardProps> = ({ sauce }) => {
  return (
    <Link to={`/sauces/${sauce._id}`} className="sauce-card">
      <img alt="Hot sauce bottle" src={sauce.imageUrl} />
      <h4>{sauce.name.toUpperCase()}</h4>
      <p>Heat: {sauce.heat}/10</p>
    </Link>
  );
};
