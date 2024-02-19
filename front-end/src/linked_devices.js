import React, { useState, useEffect } from 'react';

const LinkedDevices = () => {
  const [data, setData] = useState([]);
  let dataValue = true;
  const checkData = (data) =>{
    if (data.includes('  File "macs_usage.py"')){
      dataValue= false
    }
    else{
      dataValue=true
    }
    return dataValue
  }

  useEffect(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5007/linked_devices');
        const jsonData = await response.json();
        console.log('Fetched Data:', jsonData); // Log the fetched data

        // Convert the data to an array
        const dataArray = jsonData.split(',')

        console.log('Converted Data Array:', dataArray); // Log the converted data array
        let dataBool=checkData(dataArray)
        if (dataBool=false){
          dataArray='DENIED'
        }
        else{
          dataArray = dataArray
        }
        setData(dataArray);
        console.log(dataArray)
      } catch (error) {
        console.error('Error fetching data:', error);

        // Set jsonData to 'Permission denied' in case of an error
        setData(['Permission denied']);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data Display</h2>
      {data}
      {data.includes(' File "macs_usage.py"') ? (
        <p>Permission denied: Work in progress</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>MAC Address</th>
                <th>Total Bytes In</th>
                <th>Total Bytes Out</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item['MAC Address']}</td>
                    <td>{item['Total Bytes In']}</td>
                    <td>{item['Total Bytes Out']}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LinkedDevices;
