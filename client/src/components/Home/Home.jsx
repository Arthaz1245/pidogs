import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBreeds, getAllTemperaments } from "../../actions/index";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import Filters from "../Filters/Filters";
import Paginated from "../Paginated/Paginated";
import "./Home.css";
export default function Home() {
  const allBreeds = useSelector((state) => state.breeds);
  const [currentPage, setCurrentPage] = useState(1);
  const [breedsPerPage, setBreedsPerPage] = useState(8);
  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const [order, setOrder] = useState("");
  const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(currentPage);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentBreeds.length === 0) {
      dispatch(getAllBreeds());
      dispatch(getAllTemperaments());
    }
  }, [dispatch, currentBreeds]);
  return (
    <div>
      <h1 className="titleDoggies">Doggies</h1>
      <div>
        <Link to={"/create"}>
          <button className="bntCreateBreed">Create Breed</button>
        </Link>
      </div>
      <Filters
        setCurrentPage={setCurrentPage}
        setOrder={setOrder}
        order={order}
      />
      <Paginated
        breedsPerPage={breedsPerPage}
        allBreeds={allBreeds.length}
        paginate={paginated}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Cards currentBreeds={currentBreeds} />
    </div>
  );
}
