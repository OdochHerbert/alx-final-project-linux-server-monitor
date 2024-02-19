import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Usage() {
    const initialState = {
        networkData: {},
        outputText: '',
        txData: [0],
        rxData: [0],
        timeData: [0],
        fetching: false,
    };

    const [state, setState] = useState(initialState);

    const fetchDataAndUpdateArrays = () => {
        fetch('http://127.0.0.1:5007/get_network_data')
            .then(response => response.json())
            .then(data => {
                console.log('Raw data:', data);

                setState(prevState => ({
                    ...prevState,
                    outputText: data.output,
                    networkData: parseOutputText(data.output),
                    txData: [...prevState.txData, data.tx],
                    rxData: [...prevState.rxData, data.rx],
                    timeData: [...prevState.timeData, prevState.timeData[prevState.timeData.length - 1] + 10],
                }));

                // Log TX, RX, and Time arrays
                console.log('TX Array:', state.txData);
                console.log('RX Array:', state.rxData);
                console.log('Time Array:', state.timeData);
            })
            .catch(error => console.error('Error:', error));
    };

    const parseOutputText = output => {
        const rows = output.split('\n');
        const data = {};
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].trim().startsWith('Listening')) {
                data['Listening'] = rows[i].trim().replace('Listening on', '').trim();
            } else if (rows[i].trim().startsWith('Total send rate')) {
                data['Total send rate'] = rows[i].trim();
            } else if (rows[i].trim().startsWith('Total receive rate')) {
                data['Total receive rate'] = rows[i].trim();
            } else if (rows[i].trim().startsWith('Total send and receive rate')) {
                data['Total send and receive rate'] = rows[i].trim();
            }
        }
        return data;
    };

    useEffect(() => {
        let interval;

        const startFetching = () => {
            fetchDataAndUpdateArrays();
            interval = setInterval(() => {
                fetchDataAndUpdateArrays();
            }, 5000);
        };

        if (state.fetching) {
            // Clear the previous interval before starting a new one
            clearInterval(interval);
            startFetching();
        } else {
            // If fetching is stopped, clear the state arrays
            setState(initialState);
            clearInterval(interval);
        }

        return () => clearInterval(interval); // clear interval on component unmount
    }, [state.fetching]);

    const handleStartFetching = () => {
        setState(prevState => ({ ...prevState, fetching: true }));
    };

    const handleStopFetching = () => {
        setState(initialState);
        //clearInterval();
        console.log(state.fetching);
    };

    return (
        <div>
            <h1>Live Bandwidth Utilization:</h1>
            <div className='row'>
                <div className='col-md-4'>
                <div className='table-responsive' id="output">
            <table className='table'>
                <tbody>
                    {Object.entries(state.networkData).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
           
            <div>
                <button className='button1' onClick={handleStartFetching}>Start Fetching</button>
                <button className='button1' onClick={handleStopFetching}>Stop Fetching</button>
            </div>
                </div>
              <div className='col-md-8'>
              <Plot
                data={[
                    {
                        x: state.timeData,
                        y: state.txData,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                        name: 'Tx',
                    },
                    {
                        x: state.timeData,
                        y: state.rxData,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'blue' },
                        name: 'Rx',
                    },
                ]}
                layout={{ width: 800, height: 400, title: 'Bandwidth Usage on eth0', yaxis:{title: 'Tx and Rx in kb/s'}, xaxis:{title:'Time in seconds'}, }}
            />

              </div>
            </div>
            
            
        </div>
    );
}

export default Usage;
