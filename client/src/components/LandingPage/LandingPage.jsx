import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div>
      <h1 className="titleLanding"> Welcome. Are you Ready</h1>
      <Link to="/home">
        <button class="bone">
          <div class="c1"></div>
          <div class="c2"></div>
          <div class="c3"></div>
          <div class="c4"></div>
          <div class="b1">
            <div class="b2">Enter</div>
          </div>
        </button>
      </Link>
    </div>
  );
}
