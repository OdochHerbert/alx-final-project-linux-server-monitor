import React, { useState } from 'react';

const AboutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div>
      {/* About Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src="img/odoch.jpeg" alt="Profile" className="img-fluid rounded" />
          </div>
          <div className="col-md-6">
            <h2>About Me</h2>
            <p>
              Welcome to my alx-portfolio project.
              I'm passionate about software engineering. This has inspired me to take a journey to do the hard things
              with ALX AFRICA
            </p>
            <p>
              Connect with me on LinkedIn: <a href="www.linkedin.com/in/odoch-herbert-13b600212" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>.
            </p>
            <p>
              Email: <a href="mailto:odoherb@gmail.com">odoherb@gmail.com</a>
            </p>
            {/* Add more details about yourself as needed */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" name="message" rows="3" value={formData.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
