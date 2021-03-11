const fetchFilteredDataStart = () => {
  return {
    type: 'FETCH_FILTERED_DATA_START',
  };
};

const fetchFilteredDataSuccess = (items) => {
  return {
    type: 'FETCH_FILTERED_DATA_SUCCESS',
    payload: items,
  };
};

const fetchFilteredDataError = (error) => {
  return {
    type: 'FETCH_FILTERED_DATA_ERROR',
    payload: error,
  };
};

const fetchFilteredData = (apiURL) => {
  return (dispatch) => {
    dispatch(fetchFilteredDataStart());
    return fetch(apiURL)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        dispatch(fetchFilteredDataSuccess(result.pokemon));
      })
      .catch((error) => dispatch(fetchFilteredDataError(error)));
  };
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const clearFilteredData = () => {
  return {
    type: 'CLEAR_FILTERED_DATA',
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchFilteredDataStart,
  fetchFilteredDataSuccess,
  fetchFilteredDataError,
  fetchFilteredData,
  handleErrors,
  clearFilteredData,
};
