import { Link } from 'react-router-dom';

import flameImg from '../assets/flame.png';
import { useAuth } from '../contexts/authContext';
import './Header.css';

export const Header = () => {
  const { userId, onLogout } = useAuth();
  return (
    <header>
      <nav className="left-nav">
        <ul>
          {userId && (
            <li>
              <Link to={'/sauces'}>ALL SAUCES</Link>
            </li>
          )}
          {userId && (
            <li>
              <Link to={'/sauces/new'}>ADD SAUCE</Link>
            </li>
          )}
        </ul>
      </nav>
      <section className="logo">
        <div className="logo-image">
          <img alt="Flame logo" src={flameImg} />
        </div>
        <div className="logo-text">
          <Link to={'/'}>
            <h1>HOT TAKES</h1>
          </Link>
          <h5>THE WEB'S BEST HOT SAUCE REVIEWS</h5>
        </div>
      </section>
      <nav className="right-nav">
        <ul>
          {!userId && (
            <li>
              <Link to={'/sign-up'}>SIGN UP</Link>
            </li>
          )}
          {!userId && (
            <li>
              <Link to={'/login'}>LOGIN</Link>
            </li>
          )}
          {userId && (
            <li>
              <a
                href="#0"
                onClick={(e) => {
                  e.preventDefault();
                  onLogout();
                }}
              >
                LOGOUT
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
