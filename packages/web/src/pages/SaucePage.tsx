import { Link, useParams } from 'react-router-dom';

import { useQuerySauces } from '../hooks/tanstack/useQuerySauces';

export const SaucePage = ({}) => {
  const { id } = useParams<{ id: string }>();

  const { data: sauces } = useQuerySauces();

  const sauce = sauces?.find((s) => s._id === id);

  if (!sauce) {
    return <p>loading...</p>;
  }

  return (
    <div className="sauce-container">
      <img src={sauce.imageUrl} alt="" />
      <div className="sauce-info">
        <h1 className="sauce-name">{sauce.name}</h1>
        <p className="manufacturer">by {sauce.manufacturer}</p>
        <h3>Description</h3>
        <p>{sauce.description}</p>
        <div className="like-buttons">
          <div className="likes">
            <i></i>
            <span>{sauce.likes}</span>
          </div>
          <div className="dislikes">
            <i></i>
            <span>{sauce.dislikes}</span>
          </div>
        </div>
        <div className="like-pending"></div>
        <div className="control-buttons">
          <button mat-raised-button>BACK</button>
          <Link to={`/sauces/${sauce._id}/edit`}>MODIFY</Link>
          <button mat-raised-button color="warn">
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};
