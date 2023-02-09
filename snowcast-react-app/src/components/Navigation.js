import { Link } from 'react-router-dom';
import Search from './Search';

function Navigation() {
  return (
    <div className="Navigation">
      <div className="page-nav">
        <Link to='/'>Popular Resorts</Link>
        {/* <Link to='/search'>Search</Link> */}
      </div>
      <div className="user-nav">
        <p className="link">Sign Up</p>
        <p className="link">Login</p>
      </div>
    </div>
  );
}

export default Navigation;