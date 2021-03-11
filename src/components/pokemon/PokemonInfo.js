import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import allActions from '../../actions';
import { getPokemonStats } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { StyledBadge, Image, ProgressBar } from '../styles';
import { typeColors } from '../layout/colors';
import imgPlaceholder from '../../assets/questionMark.svg';
import spinner from '../../assets/spinner.gif';
import { PokemonTypeModal } from './PokemonTypeModal';
import '../global.css';
import { Loading } from '../layout/Loading';

export const PokemonInfo = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const { pokemonIndex } = useParams();
  const [pokemonStats, setPokemonStats] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [chosenType, setChosenType] = useState('');
  const [typeUrl, setTypeUrl] = useState('');

  const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonIndex}.svg`;

  const pokemon = useSelector((state) => state.pokemon.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.fetchPokemonActions.fetchPokemon(POKEMON_URL));

    return () => {
      dispatch(allActions.fetchPokemonActions.clearPokemonData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [POKEMON_URL]);

  useEffect(() => {
    pokemon.stats && setPokemonStats(getPokemonStats(pokemon.stats));
  }, [pokemon]);

  useEffect(() => {
    if (!modalShow) {
      setChosenType('');
      setTypeUrl('');
    }
  }, [modalShow]);

  return (
    <>
      <PokemonTypeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        chosenType={chosenType}
        url={typeUrl}
      />
      <div className='col mt-1'>
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-5'>
                <h5>{`#${pokemonIndex}`}</h5>
              </div>
              <div className='col-7'>
                <div className='float-right'>
                  Click on the badges for filtering:
                  {pokemon.types &&
                    pokemon.types.map((item) => (
                      <StyledBadge
                        className='badge badge-pill ml-1 noselect'
                        key={item.type.name}
                        primary={typeColors[item.type.name]}
                        onClick={() => {
                          setChosenType(item.type.name);
                          setTypeUrl(item.type.url);
                          setModalShow(true);
                        }}
                      >
                        {item.type.name.toUpperCase()}
                      </StyledBadge>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row align-items-center'>
              <div className='col-md-3'>
                {imgLoading ? (
                  <Image
                    className='card-img-top rounded mx-auto mt-2'
                    display={+imgLoading}
                    src={spinner}
                    alt='Loading image...'
                  />
                ) : null}
                <Image
                  className='card-img-top rounded mx-auto mt-2'
                  display={+!imgLoading}
                  src={imageURL}
                  alt='Pokemon Image'
                  onLoad={() => setImgLoading(false)}
                  onError={(e) => {
                    if (e.target.src !== imgPlaceholder) {
                      e.target.onerror = null;
                      e.target.src = imgPlaceholder;
                    }
                  }}
                />
              </div>
              {pokemonStats ? (
                <div className='col-md-9'>
                  <h5 className='mx-auto'>
                    {pokemon.name &&
                      pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.substring(1)}
                  </h5>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>HP</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <ProgressBar
                          className='progress-bar'
                          role='progressbar'
                          value={pokemonStats.hp}
                        >
                          {pokemonStats.hp}
                        </ProgressBar>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Attack</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <ProgressBar
                          className='progress-bar'
                          role='progressbar'
                          value={pokemonStats.attack}
                        >
                          {pokemonStats.attack}
                        </ProgressBar>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Defense</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <ProgressBar
                          className='progress-bar'
                          role='progressbar'
                          value={pokemonStats.defense}
                        >
                          {pokemonStats.defense}
                        </ProgressBar>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Special Attack</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <ProgressBar
                          className='progress-bar'
                          role='progressbar'
                          value={pokemonStats.specialAttack}
                        >
                          {pokemonStats.specialAttack}
                        </ProgressBar>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Special Defense</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <ProgressBar
                          className='progress-bar'
                          role='progressbar'
                          value={pokemonStats.specialDefense}
                        >
                          {pokemonStats.specialDefense}
                        </ProgressBar>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Speed</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <ProgressBar
                          className='progress-bar'
                          role='progressbar'
                          value={pokemonStats.speed}
                        >
                          {pokemonStats.speed}
                        </ProgressBar>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
