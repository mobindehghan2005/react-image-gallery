const Header = () => {
  return (
    <header className="header">
      <div>
        <h2>Expense Tracker</h2>
        <p>Manage your money smarter</p>
      </div>

      <div className="profile">
        <div className="avatar">M</div>
        <div>
          <strong>Mohammad</strong>
          <span>Personal Account</span>
        </div>
      </div>
    </header>
  );
};

export default Header;