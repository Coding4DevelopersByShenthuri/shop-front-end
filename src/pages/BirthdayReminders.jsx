import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import '../pages/BirthdayReminders.css';
import { FaBirthdayCake } from 'react-icons/fa';

const BirthdayReminders = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingEmail, setSendingEmail] = useState({});
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [hasUpcomingBirthdays, setHasUpcomingBirthdays] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);

    const fetchBirthdays = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/birthday/upcoming-birthdays`);
        setBirthdays(response.data);
        setHasUpcomingBirthdays(response.data.length > 0);
      } catch (error) {
        setError('Failed to load birthdays');
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdays();
    triggerConfetti();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerConfetti = () => {
    setIsConfettiVisible(true);
    setTimeout(() => setIsConfettiVisible(false), 5000);
  };

  const handleSendEmail = async (user) => {
    setSendingEmail((prev) => ({ ...prev, [user._id]: true }));
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/birthday/send-wish`, {
        email: user.email,
        name: user.name,
        message: `Happy Birthday ${user.name}! 🎉🎂 Wishing you a wonderful year ahead!`,
      });
      alert(`Birthday wish sent to ${user.name} at ${user.email}`);
      triggerConfetti();
    } catch (error) {
      alert(`Failed to send email to ${user.name}`);
    } finally {
      setSendingEmail((prev) => ({ ...prev, [user._id]: false }));
    }
  };

  if (loading) return <div className="birthday-loading">Loading...</div>;
  if (error) return <div className="birthday-error">{error}</div>;

  return (
    <div className="birthday-reminders-container">
      {isConfettiVisible && <Confetti width={windowSize.width} height={windowSize.height} />}

      <div className="balloon-container">
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
              <div className="birthday-card-email">{user.email}</div>
              <div className="birthday-card-date">
                {new Date(user.birthday).toLocaleDateString()}
              </div>
              <div className="birthday-card-message">
                🎉 Happy Birthday! 🎂
              </div>
              <button
                className="send-wish-button"
                onClick={() => handleSendEmail(user)}
                disabled={sendingEmail[user._id]}
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
