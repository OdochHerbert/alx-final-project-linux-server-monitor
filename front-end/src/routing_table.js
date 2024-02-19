import React, { useState, useEffect } from 'react';

const RoutingTable = () => {
  const [routingTableData, setRoutingTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5007/network/routing_tables');
        const jsonData = await response.json();
        const parsedData = parseRoutingTable(jsonData.routing_tables);
        setRoutingTableData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data immediately when the component mounts

    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [true]); // Empty dependency array ensures that this effect runs once, similar to componentDidMount

  // Function to parse the routing table data
  function parseRoutingTable(data) {
    const routes = [];
    const lines = data.split('\n');
    console.log(lines)

    lines.forEach((line) => {
      const fields = line.trim().split(/\s+/);
      if (fields.length > 0) {
        const route = {
          Destination: getFirstNumber(fields),
          Device: getValueAfterKey('dev', fields),
          Protocol: getValueAfterKey('proto', fields),
          Source: getValueAfterKey('src', fields),
          Metric: getValueAfterKey('metric', fields),
        };
        routes.push(route);
      }
    });

    return routes;
  }

  // Function to get the first appearance of a number in a value
  function getFirstNumber(fields) {
    for (const value of fields) {
      const numberMatch = value.match(/\d/);
      if (numberMatch) {
        return value;
      }
    }
    return '';
  }

  // Function to get value after a specific key
  function getValueAfterKey(key, fields) {
    const index = fields.indexOf(key);
    return index !== -1 && index < fields.length - 1 ? fields[index + 1] : '';
  }

  return (
    <div className='table-responsive'>
      <h2>Routing Table</h2>
      <table className='table' id="routingTable">
        <thead>
          <tr>
            <th>Destination</th>
            <th>Device</th>
            <th>Protocol</th>
            <th>Source</th>
            <th>Metric</th>
          </tr>
        </thead>
        <tbody id="routingTableBody">
          {routingTableData.map((route, index) => (
            <tr key={index}>
              {Object.values(route).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutingTable;
