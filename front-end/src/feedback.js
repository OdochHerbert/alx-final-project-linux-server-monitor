import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/grace/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <section className="text-center bg-light testimonials">
      <div className="container">
        <h2 className="mb-5">What people are saying...</h2>
        <div className="row">
          {messages.slice(0, 3).map((message, index) => (
            <div className="col-lg-4" key={index}>
              <div className="mx-auto testimonial-item mb-5 mb-lg-0">
                <img className="rounded-circle img-fluid mb-3" src={message.image} alt={`User ${index + 1}`} />
                <h5>{message.name}</h5>
                <p className="font-weight-light mb-0">"{message.msg}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MessageList;
