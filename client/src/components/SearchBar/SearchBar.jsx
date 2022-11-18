import React from "react";
import "./SearchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedByName, cleanBreeds } from "../../actions";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(cleanBreeds(dispatch));
    dispatch(getBreedByName(name));
    setName("");
  };
  return (
    <div>
      <form
        className="form-search"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Search breed..."
          className="searchBar"
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={name}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
