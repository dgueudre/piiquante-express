import { FC } from 'react';

import { ISauce } from '@piiquante/shared';

import { SauceCard } from './SauceCard';
import './SauceList.css';

type SauceListProps = {
  sauces?: ISauce[];
};

export const SauceList: FC<SauceListProps> = ({ sauces }) => {
  return (
    <>
      <h3>THE SAUCES</h3>
      {sauces?.length === 0 ? (
        <p>No sauces to display!</p>
      ) : (
        <div className="sauce-list">
          {sauces?.map((sauce) => <SauceCard key={sauce._id} sauce={sauce} />)}
        </div>
      )}
    </>
  );
};
