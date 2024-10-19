import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BirthdayReminders = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get('/api/upcoming-birthdays');
        setBirthdays(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load birthdays');
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Upcoming Birthdays</h2>
      {birthdays.length > 0 ? (
        <ul>
          {birthdays.map((user) => (
            <li key={user._id}>
              {user.name} - {new Date(user.birthday).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <div>No upcoming birthdays</div>
      )}
    </div>
  );
};

export default BirthdayReminders;
