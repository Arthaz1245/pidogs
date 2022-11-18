import React from "react";
import img from "../../images/loading-dog.gif";

export default function Loading() {
  return (
    <div className="positionloading">
      <img src={img} alt="Loading.." className="imgLoading" />
      <p className="LoadingTxt">Loading...</p>
    </div>
  );
}
