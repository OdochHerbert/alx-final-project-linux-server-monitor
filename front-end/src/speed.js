import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function SpeedTest() {
  const [fetchDataOnClick, setFetchDataOnClick] = useState(false);
  const [networkData, setNetworkData] = useState([]);
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  let piedata = [];

  const parseSpeedTestData = (data) => {
    console.log('Parsing data:', data);

    const dataArray = [];
    const rows = data.output.split('\n');

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].includes('Download:') || rows[i].includes('Upload:')) {
        const parts = rows[i].split(':');
        const metric = parts[0].trim();
        const value = parseFloat(parts[1].trim().split(' ')[0]);
        dataArray.push({ metric, value });
      }
    }
    console.log('Parsed data:', dataArray);
    return dataArray;
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true); // Set loading to true before making the fetch request
      fetch('http://127.0.0.1:5007/speed_test')
        .then((response) => response.json())
        .then((data) => {
          console.log('Raw data:', data);

          setOutputText(data.output);
          let data1 = parseSpeedTestData(data);
          setNetworkData(data1);
        })
        .catch((error) => console.error('Error:', error))
        .finally(() => {
          setLoading(false); // Set loading to false when the fetch request is complete
        });
    };

    if (fetchDataOnClick) {
      fetchData();
      setFetchDataOnClick(false);
    }
  }, [fetchDataOnClick]);

  const handleClick = () => {
    setFetchDataOnClick(true);
  };

  if (networkData.length > 0) {
    piedata = [networkData[0].value, networkData[1].value];
    console.log(piedata);
  }

  const data = {
    labels: ['Download', 'Upload'],
    datasets: [
      {
        label: 'Mbits/s',
        data: piedata,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    aspectRatio: 1.5,
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div className='container'> 
      <div>
        <button className='button1' onClick={handleClick} disabled={loading}>
          Test
        </button>
        {loading && <div className='loader'> </div>}
        <div className='row'>
          <div className='col-md-6'>
          <h1>Speed Test Data Display:</h1>
        {networkData.length > 0 &&
          networkData.map((entry, index) => (
            <div key={index}>
              <strong>{entry.metric}:</strong> {entry.value}
            </div>
          ))}
          </div>
          <div className='col-md-6'>
          <div className='piechart'>
        <Doughnut data={data} options={options} />
      </div>
          </div>
        </div>
       
      </div>
     
      <pre>{outputText}</pre>
    </div>
  );
}

export default SpeedTest;
