const initialState = {
  items: [],
  loading: false,
  error: null,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FILTERED_DATA_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_FILTERED_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case 'FETCH_FILTERED_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };
    case 'CLEAR_FILTERED_DATA':
      return (state = initialState);
    default:
      return state;
  }
};

export default filterReducer;
