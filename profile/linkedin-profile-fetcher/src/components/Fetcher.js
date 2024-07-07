import React, { useState } from 'react';
import axios from 'axios';
 
 
function Fetcher() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [jsonPath, setJsonPath] = useState('');
 
  const fetchProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/fetch_profile', { username });
      setProfileData(response.data.profile_data);
      setJsonPath(response.data.json_path);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
 
  return (
    <div className="container">
      <h1 className="text-center">LinkedIn Profile Fetcher</h1>
      <form onSubmit={fetchProfile}>
        <div className="form-group">
          <label htmlFor="username">LinkedIn Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Fetch Profile</button>
      </form>
      {profileData && (
        <div className="card profile-card">
          <div className="card-body">
            <h5 className="card-title">{profileData.firstName} {profileData.lastName}</h5>
            <p className="card-text">{profileData.summary}</p>
            <a href={`http://127.0.0.1:5000/download_json/${jsonPath.split('/').pop()}`} className="btn btn-secondary" download>Download JSON</a>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default Fetcher;