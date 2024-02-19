import React from 'react';

function FileManager1({ title }) {
  return (
    <div className="frame">
      <h2>{title}</h2>
      <div className="frame-content">
        <iframe src="http://localhost" title="Localhost Frame" style={{ width: '100%', height: '500px' }} />
      </div>
    </div>
  );
}

export default FileManager1;
