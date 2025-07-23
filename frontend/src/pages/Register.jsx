
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";  // Import CSS
// import Login from "./Login";

//firebase imports
import { auth,provider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post("https://foodio-backend-cgsj.onrender.com/auth/register", { username, email, password });
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    alert("Registration successful!");
    navigate("/login");
  };
  const handleGoogleAuth = async () => {
    try
    {
      let result = await signInWithPopup(auth,provider);
      let token = await result.user.getIdToken();
      console.log(token);
      let res = await axios.post('http:localhost:3001/auth/register',{idtoken:token},
        {
          withCredentials:true
        })
        console.log(res.data);

    }catch(err)
    {
      console.log("There's some issue with firebase", err);
    }
  };


  return (
    <div className="register">
      <h1 id="register-heading">Foodio</h1>
      <img src="/hat.jpg" id="tools" alt="..." />
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button id="regbutton" onClick={handleRegister}>Register</button>
      <button onClick={handleGoogleAuth} > Continue with google </button>
      <br /><br />
      <p>Already have an account? <Link to="/login" style={{ color: '#15467F' }}>Login</Link></p>
      
    </div>
  );
};

export default Register;
