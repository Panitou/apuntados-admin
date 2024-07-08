import React, { useEffect, useState } from "react";
import { getProfileRequest, updateProfileRequest } from "../api/auth.js";

function Profile() {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileRequest();
        setUser(response.data);
        setUpdatedUser({
          username: response.data.username,
          email: response.data.email,
          password: "",
        });
      } catch (error) {
        setError("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await updateProfileRequest(user.id, updatedUser);
      setUser(response.data);
      setMessage("Profile updated successfully");
    } catch (error) {
      setError("Error updating profile");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={updatedUser.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={updatedUser.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={updatedUser.password}
              onChange={handleChange}
            />
            <button type="submit">Update Profile</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
