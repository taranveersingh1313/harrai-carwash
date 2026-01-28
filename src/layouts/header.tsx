import '../assets/css/header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">Logo</div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/gallery">Gallery</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </div>
    </header>
  );
};



export default Header