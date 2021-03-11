import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import allActions from '../../actions';

export const Search = () => {
  const dispatch = useDispatch();

  const API_URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118';

  useEffect(() => {
    dispatch(allActions.fetchSearchDataActions.fetchSearchData(API_URL));
    return () => {
      dispatch(allActions.fetchSearchDataActions.clearSearchData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e) => {
    dispatch(
      allActions.fetchSearchDataActions.setSearchTerm(e.target.value.trim())
    );
  };

  return (
    <div className='input-group mt-3'>
      <input
        onChange={handleOnChange}
        type='text'
        className='form-control'
        placeholder='Search for the pokemon..'
        aria-label='Search'
        aria-describedby='basic-addon1'
      />
    </div>
  );
};
