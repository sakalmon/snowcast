import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="Navigation">
      <div className="page-nav">
        <Link to='/'>Popular Resorts</Link>
      </div>
      <div className="user-nav">
        <p className="link">Sign Up</p>
        <p className="link">Login</p>
      </div>
    </div>
  );
}

export default Navigation;