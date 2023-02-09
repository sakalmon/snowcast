import { Link } from 'react-router-dom';
function Header({ goHome }) {
  return (
    <div className="Header">
      <Link to="/">
        <img onClick={goHome} className="logo" src="https://cdn-icons-png.flaticon.com/512/9112/9112733.png" alt="logo" />
      </Link>
      <Link to="/">
        <h1 onClick={goHome} className="title">Snowcast</h1>
      </Link>
    </div>
  );
}

export default Header;