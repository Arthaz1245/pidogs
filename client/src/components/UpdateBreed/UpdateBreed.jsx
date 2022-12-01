import React, { useState, useEffect } from "react";
import "./UpdateBreed.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments, updateBreed, cleanBreeds } from "../../actions";
import swal from "sweetalert";
export default function UpdateBreed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const allBreeds = useSelector((state) => state.breeds);
  const breedTemperaments = useSelector((state) => state.temperaments);
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
  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  let validateName = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
  let validateNum = /^\d+$/;
  let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;

  function validate(input) {
    let errors = {};
    if (!input.name.trim()) {
      errors.name = "The name must be provided ";
    } else if (!validateName.test(input.name)) {
      errors.name = "Not a valid name";
    } else if (input.name.length < 2) {
      errors.name = "The name must have more than one character";
    } else if (input.name.length > 30) {
      errors.name = "The breed has too many characters";
    } else if (
      allBreeds.find((e) =>
        e.name.toLowerCase().trim().includes(input.name.toLowerCase().trim())
      )
    ) {
      errors.name = "The breed already exists";
    }
    if (!validateUrl.test(input.image)) {
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
      !validateNum.test(input.max_lifespan) ||
      parseInt(input.max_lifespan) < parseInt(input.min_lifespan)
    ) {
      errors.max_lifespan =
        "The lifespan is required. The max lifespan should be higher than min lifespan.";
    } else if (input.temperaments.length < 1) {
      errors.temperaments = "At least one temperament should be select ";
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
      temperaments: [...new Set([...input.temperaments, e.target.value])],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== e),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(input));
    let error = validate(input);
    if (Object.values(error).length !== 0) {
    } else {
      dispatch(updateBreed(id, input));
      await swal("Breed updated successfully");

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
      history.push("/home");
      dispatch(cleanBreeds(dispatch));
    }
  };

  return (
    <div>
      <Link to="/home">
        <button className="goMenuBtn">Main Menu</button>
      </Link>
      <div className="containerForm">
        <form className="Finalform " onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <h1>Update Breed</h1>
              <label htmlFor="" className="labelForm">
                Name :
              </label>
              <input
                name="name"
                type="text"
                value={input.name}
                className="inputForm"
                placeholder="Name of the breed"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
              <label htmlFor="" className="labelForm">
                Image:{" "}
              </label>
              <input
                name="image"
                type="text"
                className="inputForm"
                value={input.image}
                placeholder="Image of the breed"
                onChange={(e) => handleChange(e)}
              />
              {errors.image && <p>{errors.image}</p>}
              <label htmlFor="" className="labelForm">
                Min Height:{" "}
              </label>
              <input
                type="number"
                name="min_height"
                className="inputForm"
                value={input.min_height}
                placeholder="min height of the dog"
                onChange={(e) => handleChange(e)}
              />
              {errors.min_height && <p>{errors.min_height}</p>}
              <label htmlFor="" className="labelForm">
                Max Height:{" "}
              </label>
              <input
                name="max_height"
                type="number"
                className="inputForm"
                value={input.max_height}
                placeholder="max height of the dogn"
                onChange={(e) => handleChange(e)}
              />
              {errors.max_height && <p>{errors.max_height}</p>}
              <label htmlFor="" className="labelForm">
                Min Weight:{" "}
              </label>
              <input
                name="min_weight"
                type="number"
                className="inputForm"
                value={input.min_weight}
                placeholder="min weight of the dog"
                onChange={(e) => handleChange(e)}
              />
              {errors.min_weight && <p>{errors.min_weight}</p>}
              <label htmlFor="" className="labelForm">
                Max Weight:{" "}
              </label>
              <input
                name="max_weight"
                type="number"
                className="inputForm"
                value={input.max_weight}
                placeholder="max weight of the dogn"
                onChange={(e) => handleChange(e)}
              />
              {errors.max_weight && <p>{errors.max_weight}</p>}
              <label htmlFor="" className="labelForm">
                Min Lifespan:{" "}
              </label>
              <input
                name="min_lifespan"
                type="number"
                className="inputForm"
                value={input.min_lifespan}
                placeholder="min lifespan of the dog"
                onChange={(e) => handleChange(e)}
              />
              {errors.min_lifespan && <p>{errors.min_lifespan}</p>}

              <label htmlFor="" className="labelForm">
                Max Lifespan:{" "}
              </label>
              <input
                name="max_lifespan"
                type="number"
                className="inputForm"
                value={input.max_lifespan}
                placeholder="max lifespan of the dog"
                onChange={(e) => handleChange(e)}
              />
              {errors.max_lifespan && <p>{errors.max_lifespan}</p>}
            </div>
            <div>
              <select
                onChange={(e) => handleSelectTemperaments(e)}
                className="SelectTemp"
              >
                <option>Select a temperament</option>

                {breedTemperaments?.map((temperament) => {
                  return (
                    <option value={temperament.name} key={temperament.id}>
                      {temperament.name.toLowerCase()}
                    </option>
                  );
                })}
              </select>

              <div className="Divtemperaments">
                {
                  input.temperaments.map((temperament) => {
                    return (
                      <div key={temperament} className="temperamentsSel">
                        <button
                          onClick={() => {
                            handleDelete(temperament);
                          }}
                          className="DeleteTemperbtn"
                        >
                          x
                        </button>
                        <p>{temperament}</p>
                      </div>
                    );
                  }) //para poder ver que fui seleccionando
                }
              </div>
              {errors.temperaments && <p>{errors.temperaments}</p>}
            </div>
          </div>
          <button type="submit" className="bntSubmit">
            Modify Breed
          </button>
        </form>
      </div>
    </div>
  );
}
