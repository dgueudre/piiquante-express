import { useQuerySauces } from '../hooks/tanstack/useQuerySauces';

export const SaucesPage = () => {
  const { data: sauces } = useQuerySauces();

  return (
    <>
      <p className="list-title">THE SAUCES</p>
      {sauces?.length === 0 ? (
        <p>No sauces to display!</p>
      ) : (
        <div className="sauce-list">
          {sauces?.map((sauce) => (
            <div key={sauce._id} className="sauce-list-item">
              <img alt="Hot sauce bottle" src={sauce.imageUrl} />
              <h4>{sauce.name.toUpperCase()}</h4>
              <p>Heat: {sauce.heat}/10</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
