const initialState = {
  items: [],
  loading: false,
  error: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.items],
        count: action.payload.count,
      };
    case 'FETCH_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
        count: null,
      };
    case 'CLEAR_DATA':
      return (state = initialState);
    default:
      return state;
  }
};

export default dataReducer;
