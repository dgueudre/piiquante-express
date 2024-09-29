import { SauceList } from '../components/SauceList';
import { useQuerySauces } from '../hooks/tanstack/useQuerySauces';

export const SaucesPage = () => {
  const { data: sauces } = useQuerySauces();

  return <SauceList sauces={sauces} />;
};
