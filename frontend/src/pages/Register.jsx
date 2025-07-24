
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";  // Import CSS
// import Login from "./Login";

// *** firebase imports ***
import { auth,provider } from "../services/firebase";
import {  signInWithPopup, signInWithRedirect} from "firebase/auth";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // THis is your previous code  **********


  // const handleRegister = async () => {
  //   await axios.post("https://foodio-backend-cgsj.onrender.com/auth/register", { username, email, password });
  //   localStorage.setItem("username", username);
  //   setIsLoggedIn(true);
  //   alert("Registration successful!");
  //   navigate("/login");
  // };


  // New  code with previous error handling  **********
  const handleRegister = async () => {
              /// **** your render url  ****
    // await axios.post("https://foodio-backend-cgsj.onrender.com/auth/register", { username, email, password });
            /// local host
            try
            {
              // ***Change this url to your render url***(IMPORTANT)
              let res = await axios.post("http://localhost:3001/auth/register", { username, email, password });
              localStorage.setItem("username", username);
              setIsLoggedIn(true);
              alert("Registration successful!");
              
            }catch(err)
            {
              console.log(err);
              alert("Registration failed!");
            }
    navigate("/login");
  };
  const handleGoogleAuth = async () => {
    try
    {
      const result = await signInWithPopup(auth,provider);
      const  token = await result.user.getIdToken();
      console.log('FRONTEND GETS THE TOKEN',token);
      let res = await axios.post('http://localhost:3001/auth/firebaseAuth',{idtoken:token},
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
