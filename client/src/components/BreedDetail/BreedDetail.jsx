import React, { useEffect } from "react";
import "./BreedDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { getBreedDetails, cleanBreedDetails, cleanBreeds } from "../../actions";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
export default function BreedDetail(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const breedDetails = useSelector((state) => state.breedDetails);
  useEffect(() => {
    dispatch(getBreedDetails(id));
    return () => {
      dispatch(cleanBreedDetails(dispatch), cleanBreeds(dispatch));
    };
  }, [dispatch, id]);

  return (
    <div>
      {Object.values(breedDetails).length !== 0 ? (
        <div className="cardDetail">
          <h2>{breedDetails.name}</h2>
          <img src={breedDetails.image} alt="" />
          <div>
            {breedDetails.temperaments?.map((t, k) => {
              return (
                <div key={k}>
                  <p>{t.name}</p>
                </div>
              );
            })}
          </div>
          <div>
            <h5>min_height: {breedDetails.min_height}</h5>
            <h5>max_height: {breedDetails.max_height}</h5>
            <h5>min_weight: {breedDetails.min_weight}</h5>
            <h5>max_weight: {breedDetails.max_weight}</h5>
            <h5>min_lifespan: {breedDetails.min_lifespan}</h5>
            <h5>max_lifespan: {breedDetails.max_lifespan}</h5>
          </div>
          <div>
            <Link to="/home">
              <button>Go back</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}