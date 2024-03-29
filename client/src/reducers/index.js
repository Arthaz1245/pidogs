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
  CREATE_NEW_BREED,
  ORDER_BY_WEIGHT,
  DELETE_BREED,
  LOADING,
  UPDATE_BREED,
} from "../actions/actions";

const initialState = {
  breeds: [],
  allBreeds: [],
  temperaments: [],
  breedDetails: [],
  loading: true,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BREEDS: {
      return {
        ...state,
        breeds: action.payload,
        allBreeds: action.payload,
      };
    }

    case GET_ALL_TEMPERAMENTS: {
      return { ...state, temperaments: action.payload };
    }
    case GET_BREED_BY_NAME: {
      return {
        ...state,
        breeds: action.payload,
      };
    }
    case GET_BREEDS_DETAILS: {
      return {
        ...state,
        breedDetails: action.payload,
      };
    }

    case CLEAN_BREEDS_DETAILS: {
      return {
        ...state,
        breedDetails: action.payload,
      };
    }
    case CLEAN_BREEDS: {
      return {
        ...state,
        allBreeds: action.payload,
      };
    }
    case ORDER_BY_WEIGHT: {
      const orderByWeight =
        action.payload === "asc"
          ? state.breeds.sort(function (a, b) {
              return parseInt(a.min_weight) - parseInt(b.max_weight);
            })
          : state.breeds.sort(function (a, b) {
              return parseInt(b.max_weight) - parseInt(a.min_weight);
            });
      return {
        ...state,
        breeds: orderByWeight,
      };
    }
    case ORDER_BREEDS_ALPHABETICALLY: {
      let orderAlphabetical = [...state.breeds];
      orderAlphabetical =
        action.payload === "asc"
          ? state.breeds.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.breeds.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return { ...state, breeds: orderAlphabetical };
    }

    case FILTER_BREEDS_BY_TEMPERAMENT: {
      const allBreeds = state.allBreeds;
      const filteredBreeds =
        action.payload === "all"
          ? allBreeds
          : allBreeds.filter((breed) => {
              if (typeof breed.temperaments === "string")
                return breed.temperaments.includes(action.payload);
              if (Array.isArray(breed.temperaments)) {
                let temps = breed.temperaments.map((e) => e.name);
                return temps.includes(action.payload);
              }
              return true;
            });

      return {
        ...state,
        breeds: filteredBreeds,
      };
    }
    case FILTER_BREEDS_CREATED: {
      let copy = state.allBreeds;
      let createdFiltered;
      if (action.payload === "created") {
        let searchCreated = copy.filter((e) => e.createdInDB);

        console.log(searchCreated);
        createdFiltered = searchCreated;
      } else if (action.payload === "api") {
        createdFiltered = copy.filter((e) => !e.createdInDB);
      } else {
        createdFiltered = copy;
      }
      return {
        ...state,
        breeds: createdFiltered,
      };
    }
    case CREATE_NEW_BREED: {
      return {
        ...state,
      };
    }
    case LOADING:
      return {
        loading: true,
      };
    case DELETE_BREED:
      const allBreeds2 = state.allBreeds;
      const deletedBreed = allBreeds2.filter(
        (breed) => breed.id !== action.payload
      );
      return {
        ...state,
        breeds: deletedBreed,
      };
    case UPDATE_BREED:
      return {
        ...state,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}
