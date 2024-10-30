// src/pages/HelpPage.jsx
import React, { useState } from 'react';
import '../pages/Help.css';
import { FaAngleDown, FaAngleUp, FaEnvelope, FaPhone } from 'react-icons/fa';

const HelpPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index); // Toggle FAQ open/close
  };

  return (
    <div className="help-page"> {/* Added class help-page here */}
     <div className="shape shape-top-left">
        </div>
        <div className="shape shape-bottom-left">
        </div>
      {/* Move the title outside the help-container */}
      <h1 className="help-title font-serif">Help & Support</h1>
      <div className="help-container">
        <p className="help-description">
          Welcome to the Help page! Here you can find information to assist you with common tasks.
        </p>
        
        <section className="help-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item" onClick={() => toggleFAQ(1)}>
            <div className="faq-question">
              <span>How to navigate the website?</span>
              {openFAQ === 1 ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {openFAQ === 1 && (
              <div className="faq-answer">
                <p>You can use the navigation bar at the top of the page to browse through different sections like Home, Shop, About, and Blog.</p>
              </div>
            )}
          </div>

          <div className="faq-item" onClick={() => toggleFAQ(2)}>
            <div className="faq-question">
              <span>How to view products in the shop?</span>
              {openFAQ === 2 ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {openFAQ === 2 && (
              <div className="faq-answer">
                <p>Click on the 'Shop' link in the navigation bar to explore our product categories and view detailed information about each item.</p>
              </div>
            )}
          </div>

          <div className="faq-item" onClick={() => toggleFAQ(3)}>
            <div className="faq-question">
              <span>How to contact support?</span>
              {openFAQ === 3 ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {openFAQ === 3 && (
              <div className="faq-answer">
                <p>To reach our support team, you can email us at <a href="mailto:ShenthuMART@gmail.com">ShenthuMART@gmail.com</a> or call us at +94771234567.</p>
              </div>
            )}
          </div>
        </section>

        <section className="help-section">
          <h2>Contact Support</h2>
          <p>If you need further assistance, feel free to reach out to us at:</p>
          <p><FaEnvelope /> Email: <a href="mailto:ShenthuMART@gmail.com">ShenthuMART@gmail.com</a></p>
          <p><FaPhone /> Phone: +94 77 123 4567</p>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
