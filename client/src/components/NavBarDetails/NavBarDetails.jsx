import React from "react";
import "./NavBarDetails.css";
import { Link } from "react-router-dom";
export default function NavBarDetails() {
  return (
    <div className="header">
      <div className="buttonBack">
        <Link to="/home">
          <button className="buttonBack">
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
              alt=""
              width="12px"
              height="12px"
            />{" "}
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}
