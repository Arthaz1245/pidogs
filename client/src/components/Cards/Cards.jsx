import React from "react";
import "./Cards.css";
import DogCard from "../DogCard/DogCard";
import Loading from "../Loading/Loading";

export default function Cards({ currentBreeds }) {
  return (
    <div>
      <div className="recipeCards">
        {currentBreeds?.length < 1 ? (
          <Loading />
        ) : (
          currentBreeds?.map((t, k) => {
            return (
              <div key={k}>
                <DogCard
                  key={t.id}
                  id={t.id}
                  name={t.name}
                  min_weight={t.min_weight}
                  max_weight={t.max_weight}
                  temperaments={t.temperaments}
                  image={t.image}
                  created={t.createdInDB}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
