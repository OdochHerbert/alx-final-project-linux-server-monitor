import React, { useState, useEffect } from 'react';

const Wifi_info = () => {
  const [wifiInfo, setWifiInfo] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5007/wifi_info'); // Replace 'URL_HERE' with your actual API endpoint
        const data = await response.json();
        setWifiInfo(data);
      } catch (error) {
        console.error('Error fetching Wi-Fi information:', error);
      }
    };

    fetchData();
  }, []);

  // Function to toggle visibility of the password
  const toggleVisibility = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 5000); // Hide the password after 5 seconds
  };

  if (!wifiInfo) {
    return <p>Loading... There might be a problem</p>;
  }

  // Extract SSID and password from the response
  const { wifi_information } = wifiInfo;
  const ssid = wifi_information.split('\n')[0].split(': ')[1];
  const password = wifi_information.split('\n')[1].split(': ')[1];

  return (
    <div>
      <p>SSID/Network Name: {ssid}</p>
      <p>
        Password: {visible ? password : '******'}
        <button className='btn btn-primary' onClick={toggleVisibility}>Show Password</button>
      </p>
    </div>
  );
};

export default Wifi_info;
