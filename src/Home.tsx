
const Home = () => {
  return (
    <main className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Premium Car Washing, Right at Your Convenience</h1>
          <p>
            Because your car deserves more than just water.
            Professional, eco-friendly, and affordable car wash services.
          </p>

          <div className="hero-buttons">
            <button className="btn primary">Book Now</button>
            <button className="btn outline">Call Us</button>
          </div>
        </div>

        <img
          src="/frontpageimages/hero-car-wash.png"
          alt="Car Wash Service"
          className="hero-image"
        />
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <h2>Why Choose Us</h2>

        <div className="features">
          <div className="feature">✅ Trained Professionals</div>
          <div className="feature">🌱 Eco-Friendly Products</div>
          <div className="feature">🚿 Safe for Paint & Interior</div>
          <div className="feature">⚡ Fast & Reliable Service</div>
          <div className="feature">💰 Affordable Pricing</div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2>Our Services</h2>

        <div className="service-grid">
          <div className="service-card">
            <img src="/frontpageimages/exterior-wash.jpg" alt="Exterior Wash" />
            <h3>Exterior Foam Wash</h3>
          </div>

          <div className="service-card">
            <img src="/frontpageimages/interior-clean.jpg" alt="Interior Cleaning" />
            <h3>Interior Cleaning</h3>
          </div>

          <div className="service-card">
            <img src="/frontpageimages/polishing.png" alt="Detailing" />
            <h3>Full Car Detailing</h3>
          </div>

          <div className="service-card">
            <img src="/frontpageimages/detailing.png" alt="Polishing" />
            <h3>Polishing & Waxing</h3>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <h2>Affordable Pricing</h2>

        <div className="pricing-cards">
          <div className="price-card">
            <h3>Basic Wash</h3>
            <p className="price">₹299</p>
            <ul>
              <li>✔ Exterior Wash</li>
              <li>✔ Tyre Cleaning</li>
              <li>✔ Drying</li>
            </ul>
            <button className="btn primary">Choose Plan</button>
          </div>

          <div className="price-card popular">
            <span className="badge">Most Popular</span>
            <h3>Standard Care</h3>
            <p className="price">₹599</p>
            <ul>
              <li>✔ Exterior Foam Wash</li>
              <li>✔ Interior Vacuum</li>
              <li>✔ Dashboard Cleaning</li>
            </ul>
            <button className="btn primary">Choose Plan</button>
          </div>

          <div className="price-card">
            <h3>Premium Detailing</h3>
            <p className="price">₹999</p>
            <ul>
              <li>✔ Full Interior & Exterior</li>
              <li>✔ Wax & Polish</li>
              <li>✔ Alloy & Tyre Shine</li>
            </ul>
            <button className="btn primary">Choose Plan</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Give Your Car a Fresh Look?</h2>
        <p>Book your car wash today and experience the difference.</p>
        <button className="btn primary">Book Now</button>
      </section>

    </main>
  );
};

export default Home;
