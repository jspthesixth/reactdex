const fetchPokemonStart = () => {
  return {
    type: 'FETCH_POKEMON_START',
  };
};

const fetchPokemonSuccess = (info) => {
  return {
    type: 'FETCH_POKEMON_SUCCESS',
    payload: info,
  };
};

const fetchPokemonError = (error) => {
  return {
    type: 'FETCH_POKEMON_ERROR',
    payload: error,
  };
};

const fetchPokemon = (pokemonURL) => {
  return (dispatch) => {
    dispatch(fetchPokemonStart());
    return fetch(pokemonURL)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        dispatch(fetchPokemonSuccess(result));
      })
      .catch((error) => dispatch(fetchPokemonError(error)));
  };
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const clearPokemonData = () => {
  return {
    type: 'CLEAR_POKEMON_DATA',
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchPokemonStart,
  fetchPokemonSuccess,
  fetchPokemonError,
  fetchPokemon,
  handleErrors,
  clearPokemonData,
};
