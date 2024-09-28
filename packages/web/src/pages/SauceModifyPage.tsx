import { useParams } from 'react-router-dom';

import { SauceForm } from '../components/SauceForm';
import { useQuerySauces } from '../hooks/tanstack/useQuerySauces';

export const SauceModifyPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: sauces } = useQuerySauces();

  const sauce = sauces?.find((s) => s._id === id);

  if (!sauce) {
    return <p>Not found</p>;
  }

  return <SauceForm sauce={sauce} />;
};
