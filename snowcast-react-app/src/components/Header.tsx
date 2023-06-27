import { Link } from 'react-router-dom';
import '../assets/stylesheets/Header.scss';

function Header() {
  return (
    <div className="Header">
      <Link to="/">
        <img className="logo" src="https://cdn-icons-png.flaticon.com/512/9112/9112733.png" alt="logo" />
      </Link>
      <Link to="/">
        <h1 className="title">Snowcast</h1>
      </Link>
    </div>
  );
}

export default Header;