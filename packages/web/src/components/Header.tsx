import { Link } from 'react-router-dom';

import flameImg from '../assets/flame.png';
import './Header.css';

export const Header = () => {
  return (
    <header>
      <nav className="left-nav">
        <ul>
          <li>
            <Link to={'sauces'}>ALL SAUCES</Link>
          </li>
          <li>
            <Link to={'add-sauce'}>ADD SAUCE</Link>
          </li>
        </ul>
      </nav>
      <section className="logo">
        <div className="logo-image">
          <img alt="Flame logo" src={flameImg} />
        </div>
        <div className="logo-text">
          <h1>HOT TAKES</h1>
          <h5>THE WEB'S BEST HOT SAUCE REVIEWS</h5>
        </div>
      </section>
      <nav className="right-nav">
        <ul>
          <li>
            <Link to={'sign-up'}>SIGN UP</Link>
          </li>
          <li>
            <Link to={'login'}>LOGIN</Link>
          </li>
          <li>
            <Link to={'logout'}>LOGOUT</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
