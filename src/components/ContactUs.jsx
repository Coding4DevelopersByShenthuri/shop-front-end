import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/contact/upload-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Thank you for contacting us! Your message has been sent.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'There was a problem submitting the form. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred while submitting the form.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name" // Placeholder added
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" // Placeholder added
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter the subject" // Placeholder added
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here" // Placeholder added
              required
            />
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
