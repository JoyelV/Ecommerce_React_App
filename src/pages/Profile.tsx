import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setProfile({ username: user.username, email: user.email });
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ ...profile, id: user.id }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        // Update user in context (simplified; in production, update via context state)
        setTimeout(() => setMessage(null), 2000);
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Update failed:', error);
      setError('An error occurred while updating the profile');
    }
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <div className="profile-container">
        <div className="profile-field">
          <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <span>{profile.username}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="profile-button">Edit Profile</button>
          ) : (
            <button onClick={handleSave} className="profile-button">Save Changes</button>
          )}
          <button onClick={logout} className="profile-button logout">Logout</button>
        </div>
      </div>
      <Link to="/" className="back-button">Back to Home</Link>
    </div>
  );
};

export default Profile;