import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./LoginPage.css";
import { FaFacebook,  FaGoogle,  FaAmazon, } from "react-icons/fa";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import { addUser } from "../Redux/Reducer/User";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";

const LoginPage = () => {  
  const usersRef = collection(db, 'UserCollection');
  const dispatch = useDispatch();
  const [form, setForm] = useState({
  username: "",
  password: ""
});
const navigate = useNavigate();
const login = async (e) => {
  e.preventDefault();
  console.log(form.values);
  if (form.username && form.password) {
    const queryRequest = query(usersRef, where('username', '==', form.username),where('password', '==', form.password));
    try {
      const userlist = await getDocs(queryRequest);
      const userData = userlist.docs[0].data();
      dispatch(addUser(userData));
      navigate('/');
    } catch(e) {
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
          <form onSubmit={login}>
            <div className="form-field">
              <input type="email" placeholder="Email"  name="username" 
              value={form.username}
              onChange={handleChange}/>
            </div>
            <div className="form-field">
              <input type="password" placeholder="Password" name="password" 
              value={form.password}
              onChange={handleChange}/>
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
          <button className="btn"><NavLink to="/">Continue</NavLink></button>
        </div>
      </section>
    </section>
  );
};

export default LoginPage;
