import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function LandingPage() {
  const { loginWithGoogle } = useAuth();
  return <div><button onClick={loginWithGoogle}>Click to Login</button></div>;
}
