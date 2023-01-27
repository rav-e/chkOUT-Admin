import "./login.scss";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const login = async () => {
    console.log(email,password);
    if(email == "admin@opnbox.in" && password == "admin"){
      navigate('/dashboard', { replace: true });
    }else{
      alert("Incorrect email or password ");
    }
  }
  
  return (
    <>
      <div className="wrapperx regularShadowx">
        <div className="form_containerx ">
          <form>
            <div className="headingx">
              <h2>Welcome</h2>
            </div>
            <div className="form_wrapx">
              <div className="form_itemx">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form_wrapx">
              <div className="form_itemx">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
              </div>
            </div>
            <div className="btn-container">
              <div className="">
                <button type="submit" className="btn btn-dark" onClick={login}>
                  Login
                </button>
              </div>
            </div>

            <div>
              <p>
                Forgot Username/password:
                <a href="mailto:admin@opnbox.com"className="some">
                  Mail Here
                </a>
                {/* <Link to="/register"> Mail here</Link> */}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
