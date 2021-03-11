const initialState = {
  info: [],
  loading: false,
  error: null,
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POKEMON_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_POKEMON_SUCCESS':
      return {
        ...state,
        loading: false,
        info: action.payload,
      };
    case 'FETCH_POKEMON_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        info: [],
      };
    case 'CLEAR_POKEMON':
      return (state = initialState);
    default:
      return state;
  }
};

export default pokemonReducer;
