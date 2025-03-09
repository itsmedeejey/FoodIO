import React, { useState } from "react";
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import '../App.css'

const Login = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
      try {
        const res = await axios.post("http://localhost:5000/login", { email, password });
        localStorage.setItem("username", res.data.username);
        setIsLoggedIn(true);
        navigate("/home");
      } catch (error) {
        alert("Invalid Credentials");
      }
  }

return (
  <div>
   <div className="login">
    <h1 id="login-heading">Foodio</h1>
    <img src="/cheftools.jpg" id="hat" alt="chefhat" />
    <br /><br />
    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
    <br /><br />
    <button id="loginbutton" onClick={handleLogin}>Login</button>
    <br /><b><br /></b>
    <p>New user? <Link to="/register" style={{ color: '#3b73af' }}>Register</Link></p>
  </div>
  </div>
)
}

export default Login;
