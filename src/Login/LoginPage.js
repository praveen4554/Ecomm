import React from "react";
import { NavLink } from "react-router-dom";
import "./LoginPage.css";
import { FaFacebook,  FaGoogle,  FaAmazon, } from "react-icons/fa";

const LoginPage = () => {
  return (
    <section id="Login" className="Account just">
      <section className="col">
        <div className="login align-left">
          <h2 className="theme">LOGIN</h2>
          <p>DON'T HAVE AN ACCOUNT? <NavLink to="/signup">SIGN UP HERE.</NavLink></p>
          <div className="ssw-social-login-widget">
            <div className="ssw-socialconnect">
            <div className="ssw-fbconnect"><a><FaFacebook /></a></div>
              <div className="icon-google "><a><FaGoogle /></a></div>
              <div className="icon-amazon"><a><FaAmazon /></a></div>
            </div>
          </div>
          <form>
            <div className="form-field">
              <input type="email" placeholder="Email" />
            </div>
            <div className="form-field">
              <input type="password" placeholder="Password" />
            </div>
            <div className="forgot-password">
              <NavLink to="/forgot-password">FORGOT YOUR PASSWORD?</NavLink>
            </div>
            <div className="form-field action-bottom">
              <input className="btn" type="submit" value="SIGN IN" />
              <span className="note"> <NavLink to="/">RETURN TO STORE</NavLink></span>
            </div>
          </form>
        </div>
      </section>
      <section className="col">
        <div className="form-field">
          <h2 className="theme">CONTINUE AS A GUEST</h2>
          <button className="btn"><NavLink to="/checkout">Continue</NavLink></button>
        </div>
      </section>
    </section>
  );
};

export default LoginPage;
