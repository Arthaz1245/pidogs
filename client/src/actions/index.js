import axios from "axios";
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
} from "./actions";

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
      var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_BREED_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
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
//export function getPokemonDetails(id) {
//   return function (dispatch) {
//     axios
//       .get(`http://localhost:3001/pokemons/${id}`)
//       .then((res) => res.data)
//       .then((res) =>
//         dispatch({
//           type: GET_POKEMON_DETAILS,
//           payload: res,
//         }).catch((err) => console.log(err))
//       );
//   };
// }
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
