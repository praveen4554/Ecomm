import React from 'react';
import './Register.css';
import { FaFacebook, FaTwitter, FaApple, FaGoogle, FaYahoo, FaTumblr, FaAmazon, FaLine } from 'react-icons/fa';

function Register() {
  return (
    <div className="register-wrapper">
      <div className="wrapper">
        <h2 className="heading">CREATE ACCOUNT</h2>
        <p className='para'>ALREADY HAVE AN ACCOUNT? <a href="#">SIGN IN HERE</a>.</p>
        <div className="ssw-social-login-widget">
            <div className="ssw-socialconnect">
            <div className="ssw-fbconnect"><a><FaFacebook /></a></div>
              <div className="icon-google "><a><FaGoogle /></a></div>
              <div className="icon-amazon"><a><FaAmazon /></a></div>
            </div>
          </div>
        <form>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <div className='create'>
          <button type="submit" className="button">CREATE</button>
          </div>
         
          <div className="subscribe">
            <input type="checkbox" id="newsletter" />
            <label htmlFor="newsletter">SUBSCRIBE FOR NEWSLETTER</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
