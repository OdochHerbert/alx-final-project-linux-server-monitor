import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

const LinkedDevices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const checkData = (data) => {
    return !data.includes('  File "macs_usage.py"');
  }

  useEffect(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5007/linked_devices');
        const jsonData = await response.json();
        console.log('Fetched Data:', jsonData); // Log the fetched data

        // Convert the data to an array
        let dataArray1 = jsonData;
        console.log('dataArray1: ', dataArray1)
        // Split the data by newline
        let lines = dataArray1.split('\n');
        console.log('lines: ', lines)

        // Remove specific words and split each line
        let dataArray = lines.map(line => {
            return line.replace('MAC Address: ', '')
                       .replace('Total Bytes In: ', '')
                       .replace('Total Bytes Out: ', '')
                       // Remove the comma
                       .trim();
        });

        console.log('Converted Data Array:', dataArray); // Log the converted data array
        let isDataAllowed = checkData(dataArray);

        if (!isDataAllowed) {
          setData(['DENIED']);
        } else {
          setData(dataArray);
        }
        setLoading(false); // Set loading state to false after data is fetched
        console.log(dataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(['Permission denied']);
        setLoading(false); // Set loading state to false on error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? ( // Render CircularProgress while loading is true
        <motion.div 
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            Loading...
          </motion.div>
        </motion.div>
      ) : (
        <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
              <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Mac Address</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Bytes In</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Bytes Out</th>
              </tr>
          </thead>
          <tbody>
              {data.map((item, index) => {
                  const [macAddress, bytesIn, bytesOut] = item.split(' ');
                  return (
                      <tr key={index}>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{macAddress}</td>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{bytesIn}</td>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{bytesOut}</td>
                      </tr>
                  );
              })}
          </tbody>
      </table>
      )}
    </>
  );
};

export default LinkedDevices;
