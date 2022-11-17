import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div>
      <h1 className="titleLanding"> Welcome. Are you Ready</h1>
      <Link to="/home">
        <button className="mainMenuButton">Enter</button>
      </Link>
    </div>
  );
}
