import React from "react";
import "./DogCard.css";
import { Link } from "react-router-dom";
export default function DogCard({
  id,
  name,
  min_weight,
  max_weight,
  temperaments,
  image,
}) {
  return (
    <div>
      <Link to={`/home/${id}`}>
        <div className="CarDog">
          <h6>{name}</h6>
          <img src={image} alt className="imgDog" />
          <h6>Weight: </h6>
          <div>
            <p>
              Min: {min_weight}/kg - Max: {max_weight}/kg
            </p>
          </div>
          <h6>Temperament:</h6>

          <h4>
            {(function (temperaments) {
              if (typeof temperaments === "string") {
                return temperaments;
              }
              if (Array.isArray(temperaments)) {
                let temps = temperaments.map((e) => e.name);
                return temps.join(", ");
              }
            })(temperaments)}
          </h4>
        </div>
      </Link>
    </div>
  );
}
