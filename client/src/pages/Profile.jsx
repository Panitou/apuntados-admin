import React, { useEffect, useState } from "react";
import { getProfileRequest } from "../api/auth.js";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileRequest();
        setUser(response.data);
      } catch (error) {
        setError("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
