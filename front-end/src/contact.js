import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook

const ContactForm = () => {
  const { user, isAuthenticated } = useAuth0(); // Retrieve user information from Auth0

  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: isAuthenticated ? user.name : '', // Set name from user profile if authenticated
        email: isAuthenticated ? user.email : '', // Set email from user profile if authenticated
        message: message,
      };

      const response = await axios.post('http://127.0.0.1:8080/grace/send-email', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200) {
        setResponseMessage('Form submitted successfully!');
        setMessage('');
        setTimeout(() => {
          setResponseMessage('');
        }, 5000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to submit form. Please try again later.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <section className="text-center text-black showing5">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 mx-auto position-relative">
            <h2 className="mb-4">Have something on your mind? Tell us</h2>
          </div>
          <div className="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-9 mb-2 mb-md-0">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Say your mind..."
                    value={message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-3">
                  <button className="btn btn-primary btn-lg" type="submit">SEND</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
