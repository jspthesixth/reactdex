const initialState = {
  items: [],
  loading: false,
  error: null,
  searching: false,
  searchTerm: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SEARCH_DATA_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SEARCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case 'FETCH_SEARCH_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };
    case 'CLEAR_SEARCH_DATA':
      return (state = initialState);
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
