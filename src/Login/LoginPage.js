import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./LoginPage.css";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaYahoo,
  FaTumblr,
  FaAmazon,
  FaLine,
} from "react-icons/fa";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { addUser } from "../Redux/Reducer/User";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const usersRef = collection(db, "UserCollection");
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    if (form.username && form.password) {
      const queryRequest = query(
        usersRef,
        where("username", "==", form.username),
        where("password", "==", form.password)
      );
      try {
        const userlist = await getDocs(queryRequest);
        const userData = userlist.docs[0].data();
        dispatch(addUser(userData));
        navigate("/");
      } catch (e) {
        console.log(e);
      }
      setForm({ username: "", password: "" });
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <h2 className="login-title">LOGIN</h2>
      <p className="signup-link">
        DON'T HAVE AN ACCOUNT? <NavLink to="/signup">SIGN UP HERE.</NavLink>
      </p>

      <div className="social-icons">
        <FaFacebook className="icon facebook" />
        <FaTwitter className="icon twitter" />
        <FaGoogle className="icon google" />
        <FaYahoo className="icon yahoo" />
        <FaTumblr className="icon tumblr" />
        <FaAmazon className="icon amazon" />
        <FaLine className="icon line" />
      </div>

      <form onSubmit={login} className="login-form">
        <input
          type="email"
          placeholder="Email"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <NavLink to="/forgot-password" className="forgot-link">
          FORGOT YOUR PASSWORD?
        </NavLink>

        <div className="buttons">
          <button type="submit" className="btn sign-in">
            SIGN IN
          </button>
          <NavLink to="/" className="return-store">
            RETURN TO STORE
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
