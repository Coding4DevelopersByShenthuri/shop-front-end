// src/pages/HelpPage.jsx
import React from 'react';
import '../pages/HelpPage.css';

const HelpPage = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help & Support</h1>
      <p className="help-description">
        Welcome to the Help page! Here you can find information to assist you with common tasks.
      </p>
      
      <section className="help-section">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>How to navigate the website?</li>
          <li>How to add products to the cart?</li>
          <li>How to contact support?</li>
        </ul>
      </section>

      <section className="help-section">
        <h2>Contact Support</h2>
        <p>If you need further assistance, feel free to reach out to us at:</p>
        <p>Email: ShenthuMART@gmail.com</p>
        <p>Phone: +94743899907</p>
      </section>
    </div>
  );
};

export default HelpPage;
