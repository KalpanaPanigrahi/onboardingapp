
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phoneNumber: '',
    linkedinUN: '',
    resumeLink: ''
  });
  const [profileData, setProfileData] = useState(null);
  const [jsonPath, setJsonPath] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7136/api/LinkedIn/submitFormData', formData);
      setProfileData(response.data);
      setJsonPath(response.data.json_path);
      if (response.status===200){
        alert("sucessfully created an account")
        window.location.href='/'
      } // assuming json_path is returned in response
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const downloadJson = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/download_json/${jsonPath}`);
      setJsonPath(response.data.json_path); 
      console.log('Downloaded JSON:', response);
    } catch (error) {
      console.error('Error downloading JSON:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-left">Create an account</h1>
      <div className="row">
         <form onSubmit={fetchProfile} className="text-black">
        <fieldset>
          <div className='col'>
          <div>
            <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          <div>
            <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete="off" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="username" className="form-label mt-4">Full Name:</label>
            <input
              type="text" className="form-control" id="username" name="username"  placeholder="UserName" value={formData.username} onChange={handleChange} required/>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="form-label mt-4">Phone Number</label>
            <input type="tel" className="form-control" id="phoneNumber" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          </div>
          <div className='col'>
              <div>
                <label htmlFor="linkedinUN" className="form-label mt-4">LinkedIn Username</label>
                <input type="text" className="form-control" id="linkedinUN" placeholder="LinkedIn Username" name="linkedinUN" value={formData.linkedinUN} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="resumeLink" className="form-label mt-4">Resume Link</label>
                <input type="url" className="form-control" id="resumeLink" placeholder="Resume Link" name="resumeLink" value={formData.resumeLink} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-hover btn-primary mt-3">Submit</button>
           </div>
        </fieldset>
         </form>
      </div>
    </div>
  );
}

export default Login;