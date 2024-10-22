import React, { useState } from 'react';
import './BillingPage.css'; // Optional, for styling

const BillingPage = () => {
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'creditCard'
  });

  const [orderSummary, setOrderSummary] = useState({
    items: [
      { id: 1, name: 'Product A', price: 10.00, quantity: 2 },
      { id: 2, name: 'Product B', price: 15.00, quantity: 1 }
    ],
    totalAmount: 35.00
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., save billing details, process payment)
    console.log('Billing Details Submitted:', billingDetails);
    alert('Payment processed successfully!');
  };

  return (
    <div className="billing-page">
      <h1>Billing Information</h1>
      
      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {orderSummary.items.map(item => (
            <li key={item.id}>
              {item.name} (x{item.quantity}) - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <h3>Total: ${orderSummary.totalAmount}</h3>
      </div>

      {/* Billing Form */}
      <form className="billing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={billingDetails.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={billingDetails.email} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input 
            type="text" 
            id="address" 
            name="address" 
            value={billingDetails.address} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input 
            type="text" 
            id="city" 
            name="city" 
            value={billingDetails.city} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Postal Code:</label>
          <input 
            type="text" 
            id="postalCode" 
            name="postalCode" 
            value={billingDetails.postalCode} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select 
            id="paymentMethod" 
            name="paymentMethod" 
            value={billingDetails.paymentMethod} 
            onChange={handleInputChange}
            required
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <button type="submit" className="pay-button">Pay ${orderSummary.totalAmount}</button>
      </form>
    </div>
  );
};

export default BillingPage;
