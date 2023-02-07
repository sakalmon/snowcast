function Navigation({ goHome }) {
  return (
    <div className="Navigation">
      <div className="page-nav">
        <p className="link" onClick={goHome}>Popular Resorts</p>
      </div>
      <div className="user-nav">
        <p className="link">Sign Up</p>
        <p className="link">Login</p>
      </div>
    </div>
  );
}

export default Navigation;