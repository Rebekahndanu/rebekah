// import React from "react";

// const Signup = () => {
//     return(
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-12 col-md-5 col-sm-6">
//                 <h1>Signup</h1>
//                 </div>
//                 <div className="col-12 col-md-5 col-sm-6">
//                     <form method='POST'>
//                         <div>

//                         </div>
//                     </form>
//                 </div>
//             </div>
            
//         </div>
//     )
// }
// export default Signup

import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    phone_number: '',
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5505//userRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('User signed up:', data);
      // Redirect or perform any other actions after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
      type="confirm_password"
      name="confirm_password"
      placeholder="Password"
      value={formData.confirm_password}
      onChange={handleChange}
      required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
