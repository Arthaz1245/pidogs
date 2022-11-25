import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import "./Filters.css";
import {
  orderBreedsAlphabetically,
  getAllTemperaments,
  filterBreedsByTemperament,
  filterBreedsCreated,
  orderByWeight,
  cleanBreeds,
} from "../../actions";
export default function Filters({ setCurrentPage, setOrder, order }) {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleOrderBreedsAlphabetically = (e) => {
    e.preventDefault();
    dispatch(orderBreedsAlphabetically(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
    console.log(order);
  };
  const handleOrderBreedsByWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
    console.log(order);
  };
  const handleFilterBreedsByTemperament = (e) => {
    e.preventDefault();
    dispatch(filterBreedsByTemperament(e.target.value));
    setCurrentPage(1);
  };
  const handleFilterBreedsCreated = (e) => {
    e.preventDefault();
    dispatch(filterBreedsCreated(e.target.value));
    setCurrentPage(1);
  };
  return (
    <div>
      <SearchBar />

      <select
        onChange={(e) => {
          handleOrderBreedsAlphabetically(e);
        }}
        className="selectFilter"
      >
        <option value="default" className="selectFilter" disabled="disabled">
          Order alphabetically
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select
        onChange={(e) => {
          handleOrderBreedsByWeight(e);
        }}
        className="selectFilter"
      >
        <option value="default" disabled="disabled">
          Order by weight
        </option>
        <option value="asc" className="selectFilter">
          min weight
        </option>
        <option value="desc" className="selectFilter">
          max weight
        </option>
      </select>
      <select
        className="selectFilter"
        onChange={(e) => {
          handleFilterBreedsByTemperament(e);
        }}
      >
        <option value="default" className="selectFilter" disabled="disabled">
          Select temperament
        </option>
        <option value="all" className="selectFilter">
          all
        </option>
        {allTemperaments?.map((temperament) => {
          return (
            <option
              className="selectFilter"
              value={temperament.name}
              key={temperament.id}
            >
              {temperament.name.toLowerCase()}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => {
          handleFilterBreedsCreated(e);
        }}
        className="selectFilter"
      >
        <option value="all">all</option>
        <option value="created">created</option>
        <option value="api">api</option>
      </select>
    </div>
  );
}
