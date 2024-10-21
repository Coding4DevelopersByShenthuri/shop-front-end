import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/BirthdayReminders.css'; // Import the CSS file for custom styling
import { FaBirthdayCake } from 'react-icons/fa'; // Importing a birthday cake icon

const BirthdayReminders = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get('http://localhost:3000/birthday/upcoming-birthdays');
        setBirthdays(response.data); // Assuming response.data contains an array of birthday customers
        setLoading(false);
      } catch (error) {
        setError('Failed to load birthdays');
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, []);

  if (loading) return <div className="birthday-loading">Loading...</div>;
  if (error) return <div className="birthday-error">{error}</div>;

  return (
    <div className="birthday-reminders-container">
      <div className="balloon-container"> {/* Balloon container added */}
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
              <div className="birthday-card-date">
                {new Date(user.birthday).toLocaleDateString()} {/* Formatting date */}
              </div>
              <div className="birthday-card-message">
                🎉 Happy Birthday! 🎂
              </div>
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
