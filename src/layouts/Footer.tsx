import '../assets/css/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col">
          <h3 className="footer-logo">CarWash</h3>
          <p>
            Professional car washing & detailing services.
            Clean. Shine. Protect.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/career">Career</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>📍 Ludhiana – Ferozepur Road</p>
          <p>📞 +91 9041614913</p>
          <p>✉️ support@carwash.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CarWash. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
