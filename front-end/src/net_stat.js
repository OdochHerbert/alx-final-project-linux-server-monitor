import React, { useState, useEffect } from 'react';

const NetworkStatistics = () => {
  // State to store network statistics data
  const [networkStatistics, setNetworkStatistics] = useState('');

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await fetch('http://127.0.0.1:5007/network/statistics');
        const data = await response.json();
        setNetworkStatistics(data.network_statistics);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <h1>Network Statistics</h1>
      <div id="networkStatistics">
        {/* Display the fetched network statistics */}
        {networkStatistics.split('\n').map((line, index) => (
          <div key={index} className={line.includes(':') ? 'category' : 'stat'}>
            {line.trim()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkStatistics;
