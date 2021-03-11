const fetchDataStart = () => {
  return {
    type: 'FETCH_DATA_START',
  };
};

const fetchDataSuccess = (items, count) => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: { items, count },
  };
};

const fetchDataError = (error) => {
  return {
    type: 'FETCH_DATA_ERROR',
    payload: error,
  };
};

const fetchData = (apiURL) => {
  return (dispatch) => {
    dispatch(fetchDataStart());
    return fetch(apiURL)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        dispatch(fetchDataSuccess(result.results, result.count));
      })
      .catch((error) => dispatch(fetchDataError(error)));
  };
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const clearData = () => {
  return {
    type: 'CLEAR_DATA',
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataError,
  fetchData,
  handleErrors,
  clearData,
};
