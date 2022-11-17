import React, { useState, useEffect } from "react";
import "./CreateBreed.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments, createNewBreed, cleanBreeds } from "../../actions";

export default function CreateBreed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_lifespan: "",
    max_lifespan: "",
    image: "",
    temperaments: [],
  });

  let validateName = /^[a-zA-Z0-9\s]+$/;
  let validateNum = /^\d+$/;
  let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "The name must be provided ";
    } else if (validateName.test(input.name)) {
      errors.name = "Not a valid name";
    } else if (input.name.length < 2) {
      errors.name = "The name must have more than one character";
    } else if (input.name.length > 30) {
      errors.name = "The breed has too many characters";
    }
    if (!validateUrl.test(input.img)) {
      errors.image = "URL  for the image required";
    }
    if (
      !validateNum.test(input.min_height) ||
      parseInt(input.min_height) < 1 ||
      parseInt(input.min_height) > parseInt(input.max_height)
    ) {
      errors.min_height =
        "The height is required. The max height should be higher than min height.";
    }

    if (
      !validateNum.test(input.max_height) ||
      parseInt(input.max_height) < parseInt(input.min_height)
    ) {
      errors.min_height =
        "The height is required. The max height should be higher than min height.";
    }
    //weight
    if (
      !validateNum.test(input.min_weight) ||
      parseInt(input.min_weight) < 1 ||
      parseInt(input.min_weight) > parseInt(input.max_weight)
    ) {
      errors.min_weight =
        "The weight is required. The max weight should be higher than min weight.";
    }

    if (
      !validateNum.test(input.max_weight) ||
      parseInt(input.max_weight) < parseInt(input.min_weight)
    ) {
      errors.min_weight =
        "The weight is required. The max weight should be higher than min weight.";
    }
    //lifespan
    if (
      !validateNum.test(input.min_lifespan) ||
      parseInt(input.min_lifespan) < 1 ||
      parseInt(input.min_lifespan) > parseInt(input.max_lifespan)
    ) {
      errors.min_lifespan =
        "The lifespan is required. The max lifespan should be higher than min lifespan.";
    }

    if (
      !validateNum.test(input.max_weight) ||
      parseInt(input.max_lifespan) < parseInt(input.min_lifespan)
    ) {
      errors.max_lifespan =
        "The lifespan is required. The max lifespan should be higher than min lifespan.";
    }
    return errors;
  }
  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSelectTemperaments = (e) => {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== e),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !errors.name &&
      !errors.min_height &&
      !errors.max_height &&
      !errors.min_weight &&
      !errors.max_weight &&
      !errors.min_lifespan &&
      !errors.max_lifespan &&
      !errors.temperaments
    ) {
      dispatch(createNewBreed(input));
      setInput({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_lifespan: "",
        max_lifespan: "",
        image: "",
        temperaments: [],
      });
      dispatch(cleanBreeds(dispatch));
      history.push("/home");
    } else {
      alert("Error. You need to verify your form");
    }
  };
  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);
  return (
    <div>
      <Link to="/home">
        <button>Main Menu</button>
      </Link>
      <h2>Create Breed</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <label htmlFor="">Name :</label>
            <input
              name="name"
              type="text"
              value={input.name}
              placeholder="Name of the breed"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
            <label htmlFor="">Image: </label>
            <input
              name="image"
              type="text"
              value={input.img}
              placeholder="Image of the breed"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p>{errors.img}</p>}
            <input
              type="number"
              name="min_height"
              value={input.min_height}
              placeholder="min height of the dog"
              onChange={(e) => handleChange(e)}
            />
            {errors.min_height && <p>{errors.min_height}</p>}
            <input
              name="max_height"
              type="number"
              value={input.max_height}
              placeholder="max height of the dogn"
              onChange={(e) => handleChange(e)}
            />
            {errors.max_height && <p>{errors.max_height}</p>}
            <input
              name="min_weight"
              type="number"
              value={input.min_weight}
              placeholder="min weight of the dog"
              onChange={(e) => handleChange(e)}
            />
            {errors.min_weight && <p>{errors.min_weight}</p>}
            <input
              name="max_weight"
              type="number"
              value={input.max_weight}
              placeholder="max weight of the dogn"
              onChange={(e) => handleChange(e)}
            />
            {errors.max_weight && <p>{errors.max_weight}</p>}
            <input
              name="min_lifespan"
              type="number"
              value={input.min_lifespan}
              placeholder="min lifespan of the dog"
              onChange={(e) => handleChange(e)}
            />
            {errors.min_lifespan && <p>{errors.min_lifespan}</p>}
            <input
              name="max_lifespan"
              type="number"
              value={input.max_lifespan}
              placeholder="max lifespan of the dog"
              onChange={(e) => handleChange(e)}
            />
            {errors.max_lifespan && <p>{errors.max_lifespan}</p>}
          </div>
          <div>
            <select onChange={(e) => handleSelectTemperaments(e)}>
              <option>Select a temperament</option>

              {temperaments?.map((temperament) => {
                return (
                  <option value={temperament.name} key={temperament.id}>
                    {temperament.name.toLowerCase()}
                  </option>
                );
              })}
            </select>
            {
              input.temperaments.map((temperament) => {
                return (
                  <div key={temperament}>
                    <p>{temperament}</p>
                    <button
                      onClick={() => {
                        handleDelete(temperament);
                      }}
                    >
                      x
                    </button>
                  </div>
                );
              }) //para poder ver que fui seleccionando
            }
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
