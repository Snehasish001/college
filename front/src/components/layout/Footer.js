import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div>
          <h2>MotoInfo</h2>
          <p>Get the latest bike specs, comparisons, and launch updates all in one place.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/compare">Compare</a></li>
            <li><a href="/launches">New Launches</a></li>
            <li><a href="/brands">Brands</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3>Connect With Us</h3>
          <ul>
            <li><a href="mailto:contact@motoinfo.com">contact@motoinfo.com</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MotoInfo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
