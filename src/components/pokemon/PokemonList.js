import { useCallback, useEffect, useRef, useState } from 'react';
import { PokemonCard } from './PokemonCard';
import { useDispatch, useSelector } from 'react-redux';
import { typeColors } from '../layout/colors';
import { types } from '../types';
import allActions from '../../actions/';
import { Loading } from '../layout/Loading';

export const PokemonList = () => {
  const [filterType, setFilterType] = useState('all');
  const [offset, setOffset] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  const searchTerm = useSelector((state) => state.search.searchTerm);
  const searchData = useSelector((state) =>
    state.search.items.filter((item) =>
      searchTerm ? item.name.startsWith(searchTerm.toLowerCase()) : item
    )
  );
  const filter = useSelector((state) =>
    state.filter.items.map((item) => item.pokemon.name)
  );
  const pokemons = useSelector((state) =>
    state.data.items.filter((item) =>
      types[filterType] ? filter.includes(item.name) : item
    )
  );
  const pokemonLen = pokemons.length;
  const pokemonsCount = useSelector((state) => state.data.count);
  const hasMore =
    filter.length > 0 ? pokemonLen < filter.length : pokemonLen < pokemonsCount;
  const loading = useSelector((state) => state.data.loading);
  const dispatch = useDispatch();

  const API_URL =
    offset !== 0
      ? `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      : 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  const LOAD_ALL_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118`;
  const FILTER_URL = `https://pokeapi.co/api/v2/type/${types[filterType]}`;

  useEffect(() => {
    types[filterType] &&
      dispatch(
        allActions.fetchFilteredDataActions.fetchFilteredData(FILTER_URL)
      );

    return () => {
      dispatch(allActions.fetchFilteredDataActions.clearFilteredData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FILTER_URL]);

  useEffect(() => {
    dispatch(allActions.fetchDataActions.fetchData(API_URL));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL]);

  useEffect(() => {
    return () => {
      dispatch(allActions.fetchDataActions.clearData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const observer = useRef();
  const lastPokemonCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log(
              'Last PokemonCard component is visible, fetching new data..'
            );
            setOffset((prevOffset) => prevOffset + 20);
          }
        },
        { threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const loadAllPokemons = () => {
    dispatch(allActions.fetchDataActions.clearData());
    dispatch(allActions.fetchDataActions.fetchData(LOAD_ALL_URL));
    setAllLoaded(true);
  };

  return (
    <>
      <div className='row mt-5'>
        <div className='col-6'>
          {allLoaded && (
            <select
              className='form-select'
              aria-label='Select type'
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value='all'>All types</option>
              {Object.keys(typeColors).map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.substring(1)}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className='col-6'>
          <div className='float-right'>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={() => loadAllPokemons()}
            >
              Load'em All
            </button>
          </div>
        </div>
      </div>
      <div className='col mt-5'></div>
      <div className='row mt-5'>
        {searchTerm && types[filterType]
          ? pokemons
              .filter((item) => item.name.startsWith(searchTerm.toLowerCase()))
              .map((item, index) => (
                <PokemonCard
                  key={index}
                  pokemonIndex={item.url.split('/').reverse()[1]}
                  name={
                    item.name.charAt(0).toUpperCase() + item.name.substring(1)
                  }
                />
              ))
          : searchTerm
          ? searchData.map((item, index) => (
              <PokemonCard
                key={index}
                pokemonIndex={item.url.split('/').reverse()[1]}
                name={
                  item.name.charAt(0).toUpperCase() + item.name.substring(1)
                }
              />
            ))
          : pokemons.map((item, index) => {
              if (pokemons.length === index + 1) {
                return (
                  <PokemonCard
                    ref={lastPokemonCardRef}
                    key={index}
                    pokemonIndex={item.url.split('/').reverse()[1]}
                    name={
                      item.name.charAt(0).toUpperCase() + item.name.substring(1)
                    }
                  />
                );
              } else {
                return (
                  <PokemonCard
                    key={index}
                    pokemonIndex={item.url.split('/').reverse()[1]}
                    name={
                      item.name.charAt(0).toUpperCase() + item.name.substring(1)
                    }
                  />
                );
              }
            })}
        {loading ? <Loading /> : null}
      </div>
    </>
  );
};
