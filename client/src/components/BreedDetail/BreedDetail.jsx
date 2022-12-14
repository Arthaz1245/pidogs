import React, { useEffect } from "react";
import "./BreedDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { getBreedDetails, cleanBreedDetails, cleanBreeds } from "../../actions";

import Loading from "../Loading/Loading";
import NavBarDetails from "../NavBarDetails/NavBarDetails";
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
    <div className="breedDetail">
      <NavBarDetails />
      <div className="container">
        {Object.values(breedDetails).length !== 0 ? (
          <div className="cardDetail">
            <img src={breedDetails.image} className="cardImage" alt="" />
            <h2 className="titleNameBreed">{breedDetails.name}</h2>

            <div className="allTemps">
              <h5 className="h5tem">Temperaments</h5>
              {breedDetails.temperaments?.map((t, k) => {
                return (
                  <div key={k}>
                    <p className="eachTemperament">{t.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="table2">
              <h5>min_height: {breedDetails.min_height}</h5>
              <h5>max_height: {breedDetails.max_height}</h5>
              <h5>min_weight: {breedDetails.min_weight}</h5>
              <h5>max_weight: {breedDetails.max_weight}</h5>
              <h5>min_lifespan: {breedDetails.min_lifespan}</h5>
              <h5>max_lifespan: {breedDetails.max_lifespan}</h5>
            </div>
          </div>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
