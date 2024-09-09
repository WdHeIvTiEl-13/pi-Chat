import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">piChat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Password" />
          <button>Sign in</button>
        </form>
        <p>Don't have an account? <Link to="/resister">Resister</Link></p>
        {err && <span>Something went wrong.</span>}
      </div>
    </div>
  )
}

export default Login;