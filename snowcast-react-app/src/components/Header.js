function Header({ goHome }) {
  return (
    <div className="Header">
      <img onClick={goHome} className="logo" src="https://cdn-icons-png.flaticon.com/512/9112/9112733.png" alt="logo" />
      <h1 onClick={goHome} className="title">Snowcast</h1>
    </div>
  );
}

export default Header;