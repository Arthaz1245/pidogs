import axios from "axios";
import swal from "sweetalert";
import {
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  FILTER_BREEDS_BY_TEMPERAMENT,
  ORDER_BREEDS_ALPHABETICALLY,
  GET_BREED_BY_NAME,
  CLEAN_BREEDS,
  FILTER_BREEDS_CREATED,
  GET_BREEDS_DETAILS,
  CLEAN_BREEDS_DETAILS,
  ORDER_BY_WEIGHT,
  DELETE_BREED,
  LOADING,
  UPDATE_BREED,
} from "./actions";

export function loading() {
  return {
    type: LOADING,
  };
}
export function getAllBreeds() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: GET_ALL_BREEDS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterBreedsByTemperament(payload) {
  return {
    type: FILTER_BREEDS_BY_TEMPERAMENT,
    payload,
  };
}
export function orderBreedsAlphabetically(payload) {
  return {
    type: ORDER_BREEDS_ALPHABETICALLY,
    payload,
  };
}
export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}
export function getAllTemperaments() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/temperaments");
      return dispatch({
        type: GET_ALL_TEMPERAMENTS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getBreedByName(name) {
  return async function (dispatch) {
    try {
      const breedByName = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      if (breedByName.data.length) {
        return dispatch({
          type: GET_BREED_BY_NAME,
          payload: breedByName.data,
        });
      } else {
        await swal("Breed Not Found", "The breed does not exist", "error");
      }
    } catch (error) {
      await swal("Breed Not Found", "The breed does not exist", "error");
      console.log(error);
    }
  };
}
export function getBreedDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_BREEDS_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function createNewBreed(payload) {
  return async function () {
    try {
      const data = await axios.post(`http://localhost:3001/dogs`, payload);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}
// export function deleteBreed(id) {
//   return function (dispatch) {
//     axios
//       .delete(`http://localhost:3001/dogs/${id}`)
//       .then((res) => res.data)
//       .then((res) =>
//         dispatch({
//           type: DELETE_BREED,
//           payload: res.id,
//         })
//       );
//   };
// }

export function deleteBreed(id) {
  return async function (dispatch) {
    try {
      const breedId = await axios.delete(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: DELETE_BREED,
        payload: breedId.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function updateBreed(id, payload) {
  return async function (dispatch) {
    try {
      const breedId = await axios.put(
        `http://localhost:3001/dogs/${id}`,
        payload
      );
      return dispatch({
        type: UPDATE_BREED,
        payload: breedId.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanBreeds(dispatch) {
  return dispatch({
    type: CLEAN_BREEDS,
    payload: [],
  });
}
export function cleanBreedDetails(dispatch) {
  return dispatch({
    type: CLEAN_BREEDS_DETAILS,
    payload: [],
  });
}
export function filterBreedsCreated(payload) {
  return {
    type: FILTER_BREEDS_CREATED,
    payload,
  };
}
