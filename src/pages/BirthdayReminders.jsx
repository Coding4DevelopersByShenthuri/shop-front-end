import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti'; // Importing the confetti component
import '../pages/BirthdayReminders.css'; // Import the CSS file for custom styling
import { FaBirthdayCake } from 'react-icons/fa'; // Importing a birthday cake icon

const BirthdayReminders = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingEmail, setSendingEmail] = useState({}); // To track email sending status for each user
  const [isConfettiVisible, setIsConfettiVisible] = useState(false); // For confetti visibility
  const [hasUpcomingBirthdays, setHasUpcomingBirthdays] = useState(false); // For sidebar alert

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/birthday/upcoming-birthdays`);
        setBirthdays(response.data); 
        setLoading(false);

        // Set alert symbol if there are upcoming birthdays
        if (response.data.length > 0) {
          setHasUpcomingBirthdays(true); // Trigger alert in the sidebar
        } else {
          setHasUpcomingBirthdays(false); // No upcoming birthdays, no alert
        }
      } catch (error) {
        setError('Failed to load birthdays');
        setLoading(false);
      }
    };

    fetchBirthdays();

    // Show confetti for 5 seconds when the page loads
    setIsConfettiVisible(true);
    setTimeout(() => {
      setIsConfettiVisible(false);
    }, 5000); // Confetti disappears after 5 seconds
  }, []);

  const handleSendEmail = async (user) => {
    setSendingEmail((prev) => ({ ...prev, [user._id]: true })); // Set sending state to true for that user
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/birthday/send-wish`, {
        email: user.email,
        name: user.name,
        message: `Happy Birthday ${user.name}! 🎉🎂 Wishing you a wonderful year ahead!`,
      });
      alert(`Birthday wish sent to ${user.name} at ${user.email}`);

      // Trigger confetti when a birthday wish is sent
      setIsConfettiVisible(true);
      setTimeout(() => {
        setIsConfettiVisible(false);
      }, 5000);
    } catch (error) {
      alert(`Failed to send email to ${user.name}`);
    } finally {
      setSendingEmail((prev) => ({ ...prev, [user._id]: false })); // Reset sending state
    }
  };

  if (loading) return <div className="birthday-loading">Loading...</div>;
  if (error) return <div className="birthday-error">{error}</div>;

  return (
    <div className="birthday-reminders-container">
      {/* Confetti pop-up effect */}
      {isConfettiVisible && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <div className="balloon-container"> {/* Balloon container added */ }
        <div className="balloon balloon1"></div>
        <div className="balloon balloon2"></div>
        <div className="balloon balloon3"></div>
        <div className="balloon balloon4"></div>
        <div className="balloon balloon5"></div>
        <div className="balloon balloon6"></div>
        <div className="balloon balloon7"></div>
        <div className="balloon balloon8"></div>
        <div className="balloon balloon9"></div>
        <div className="balloon balloon10"></div>
      </div>
      
      <h2 className="birthday-heading">
        <FaBirthdayCake className="birthday-icon" /> Upcoming Birthdays
      </h2>

      {birthdays.length > 0 ? (
        <div className="birthday-list">
          {birthdays.map((user) => (
            <div key={user._id} className="birthday-card">
              <div className="birthday-card-name">{user.name}</div>
              <div className="birthday-card-email">{user.email}</div> {/* Displaying the email */}
              <div className="birthday-card-date">
                {new Date(user.birthday).toLocaleDateString()} {/* Formatting date */}
              </div>
              <div className="birthday-card-message">
              🎉 Happy Birthday! 🎂 
              </div>
              <button
                className="send-wish-button"
                onClick={() => handleSendEmail(user)}
                disabled={sendingEmail[user._id]} // Disable button if email is being sent
              >
                {sendingEmail[user._id] ? 'Sending...' : 'Send Birthday Wish'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-birthdays">No upcoming birthdays</div>
      )}
    </div>
  );
};

export default BirthdayReminders;
