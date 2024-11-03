import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Typewriter } from "react-simple-typewriter";
import "./LandingPage.css";

export default function LandingPage() {
  const { loginWithGoogle } = useAuth();
  return (
    <div
      style={{ height: "100%" }}
      className="100vh w-100 d-flex justify-content-center align-items-center"
    >
      <div className="card custom-card mx-4">
        <div className="card-body p-4 pt-5">
          <h3>Welcome back</h3>
          Log in or sign up to get smarter responses and more.
          <div className="buttons mt-2">
            <button onClick={loginWithGoogle} className="custom-login-button">
              Click to Login
            </button>
          </div>
          <div className="dev-info">
            ChatGPT Clone by <a href="https://github.com/vickydecodes/" style={{textDecoration: 'none', color: 'white'}}>Vicky</a>
          </div>
        </div>
      </div>
    </div>
  );
}
