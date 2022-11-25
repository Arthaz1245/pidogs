import React from "react";
import "./DogCard.css";
import { Link } from "react-router-dom";
import { deleteBreed, cleanBreeds } from "../../actions";
import { useDispatch } from "react-redux";
export default function DogCard({
  id,
  name,
  min_weight,
  max_weight,
  temperaments,
  image,
  created,
}) {
  const dispatch = useDispatch();
  //useEffect(() => {
  //   dispatch(getBreedDetails(id));
  // return () => {
  // dispatch(cleanBreedDetails(dispatch), cleanBreeds(dispatch));
  //};
  // }, [dispatch, id]);
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(cleanBreeds(dispatch));
    dispatch(deleteBreed(id));
  };

  return (
    <div>
      {created ? (
        <Link to={`/home/${id}`} className="Linkt">
          <div className="CardDog">
            <img src={image} alt={"dd"} className="imgDog" />
            <h6 className="Title">{name}</h6>

            <h6 className="labelt">Weight: </h6>

            <p className="weightText">
              Min: {min_weight}/kg - Max: {max_weight}/kg
            </p>

            <h6 className="labelt">Temperament:</h6>

            <p className="styledTemp">
              {(function (temperaments) {
                if (typeof temperaments === "string") {
                  return temperaments;
                }
                if (Array.isArray(temperaments)) {
                  let temps = temperaments.map((e) => e.name);
                  return temps.join(", ");
                }
              })(temperaments)}
            </p>
            <button onClick={(e) => handleDelete(e)}>Delete</button>
          </div>
        </Link>
      ) : (
        <Link to={`/home/${id}`} className="Linkt">
          <div className="CardDog">
            <img src={image} alt={"dd"} className="imgDog" />
            <h6 className="Title">{name}</h6>

            <h6 className="labelt">Weight: </h6>

            <p className="weightText">
              Min: {min_weight}/kg - Max: {max_weight}/kg
            </p>

            <h6 className="labelt">Temperament:</h6>

            <p className="styledTemp">
              {(function (temperaments) {
                if (typeof temperaments === "string") {
                  return temperaments;
                }
                if (Array.isArray(temperaments)) {
                  let temps = temperaments.map((e) => e.name);
                  return temps.join(", ");
                }
              })(temperaments)}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}
