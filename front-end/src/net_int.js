import React, { useEffect, useState } from 'react';
import RoutingTable from './routing_table';

const NetworkInterfaces = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5007/network/interfaces');
        const jsonData = await response.json();
        const newInputData = { "network_interfaces": jsonData.network_interfaces };

        setTableData(parseAndFormatData(newInputData));
        console.log(newInputData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data immediately when the component mounts

    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs once, similar to componentDidMount

  const parseAndFormatData = (inputData) => {
    const networkInterfaces = inputData.network_interfaces;

    // Remove "network_interfaces": from the JSON
    const cleanedData = networkInterfaces.replace('"network_interfaces": ', '');

    // Remove numbers followed by colon
    let result = cleanedData.replace(/\d+:/g, '');

    // Add a combination of numbers and semicolons
    const combination = '1;2;3;4;5';

    // Place 'description ' before any '<'
    result = result.replace(/</g, 'description <');

    // Remove specified words
    const wordsToRemove = ['description', 'mtu', 'qdisc', 'state', 'mode', 'group', 'qlen', 'link/loopback', 'brd'];

    wordsToRemove.forEach(word => {
      const regex = new RegExp(word, 'g');
      result = result.replace(regex, '');
    });

    // Remove the combination of numbers and semicolons
    const cleanedData2 = result.replace(/1;2;3;4;5\s*/, '');

    // Combine last two fields with ':'
    const combinedData = cleanedData2.replace(/(\S+)\s+(\S+)$/, '$1:$2');

    // Split the cleaned data into an array of fields
    const fields = combinedData.split(/\s+/).filter(Boolean);

    // Create an array after every 10 fields
    const arrays = [];
    for (let i = 0; i < fields.length; i += 10) {
      arrays.push(fields.slice(i, i + 10));
    }

    const title = ['interface', 'description', 'mtu', 'qdisc', 'state', 'mode', 'group', 'qlen', 'link/loopback', 'brd'];
    arrays.unshift(title);

    return arrays;
  };

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h3>Interface Stats</h3>
        <div className='table-responsive'>
          {tableData.length > 0 && (
            <table className='table'>
              <thead>
                <tr>
                  {tableData[0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className='col-md-6'>
        <RoutingTable />
      </div>
    </div>
  );
};

export default NetworkInterfaces;
