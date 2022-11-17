import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import "./Filters.css";
import {
  orderBreedsAlphabetically,
  getAllTemperaments,
  filterBreedsByTemperament,
  filterBreedsCreated,
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
      >
        <option value="default" disabled="disabled">
          Order
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select
        onChange={(e) => {
          handleFilterBreedsByTemperament(e);
        }}
      >
        <option value="all">all</option>
        {allTemperaments?.map((temperament) => {
          return (
            <option value={temperament.name} key={temperament.id}>
              {temperament.name.toLowerCase()}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => {
          handleFilterBreedsCreated(e);
        }}
      >
        <option value="all">all</option>
        <option value="created">created</option>
        <option value="api">api</option>
      </select>
    </div>
  );
}
