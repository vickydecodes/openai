import React from "react";
import AppRoutes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
