import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBreeds } from "../../actions/index";
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
    dispatch(getAllBreeds());
  }, [dispatch]);
  return (
    <div>
      <h1>New Api</h1>
      <div>
        <Link to={"/home/create"}>
          <button>Create</button>
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
      />
      <Cards currentBreeds={currentBreeds} />
    </div>
  );
}
