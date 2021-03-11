const fetchSearchStart = () => {
  return {
    type: 'FETCH_SEARCH_DATA_START',
  };
};

const fetchSearchSuccess = (info) => {
  return {
    type: 'FETCH_SEARCH_DATA_SUCCESS',
    payload: info,
  };
};

const fetchSearchError = (error) => {
  return {
    type: 'FETCH_SEARCH_DATA_ERROR',
    payload: error,
  };
};

const fetchSearchData = (pokemonURL) => {
  return (dispatch) => {
    dispatch(fetchSearchStart());
    return fetch(pokemonURL)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        dispatch(fetchSearchSuccess(result.results));
      })
      .catch((error) => dispatch(fetchSearchError(error)));
  };
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const clearSearchData = () => {
  return {
    type: 'CLEAR_SEARCH_DATA',
  };
};

const setSearchTerm = (searchTerm) => {
  return {
    type: 'SET_SEARCH_TERM',
    payload: searchTerm,
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchSearchStart,
  fetchSearchSuccess,
  fetchSearchError,
  fetchSearchData,
  handleErrors,
  clearSearchData,
  setSearchTerm,
};
