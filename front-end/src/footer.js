import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 text-center text-lg-start my-auto h-100">
            <ul className="list-inline mb-2">
              <li className="list-inline-item"><a href="/about">About</a></li>
              <li className="list-inline-item"><span>⋅</span></li>
              <li className="list-inline-item"><Link to='/contact'className='link'>Contact</Link></li>
              <li className="list-inline-item"><span>⋅</span></li>
              <li className="list-inline-item"><a href="#">Terms of Use</a></li>
              <li className="list-inline-item"><span>⋅</span></li>
              <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
            </ul>
            <p className="text-muted small mb-4 mb-lg-0">© Odoch Herbert 2023. All Rights Reserved.</p>
          </div>
          <div className="col-lg-6 text-center text-lg-end my-auto h-100">
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><a href="#"><i className="fa fa-facebook fa-2x fa-fw"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="fa fa-twitter fa-2x fa-fw"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="fa fa-instagram fa-2x fa-fw"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
