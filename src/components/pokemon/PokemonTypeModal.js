import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { PokemonCard } from './PokemonCard';
import { StyledBadge } from '../styles';
import { typeColors } from '../layout/colors';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../actions';

export const PokemonTypeModal = ({ chosenType, url, ...props }) => {
  const filter = useSelector((state) => state.filter.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.fetchFilteredDataActions.fetchFilteredData(url));

    return () => {
      dispatch(allActions.fetchFilteredDataActions.clearFilteredData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <Modal
      animation={false}
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <StyledBadge
            className='badge badge-pill mr-1 noselect'
            primary={typeColors[chosenType]}
          >
            {chosenType && chosenType.toUpperCase()}
          </StyledBadge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row mt-5'>
          {filter.map((item, index) => (
            <PokemonCard
              key={index}
              modal
              pokemonIndex={item.pokemon.url.split('/').reverse()[1]}
              name={
                item.pokemon.name.charAt(0).toUpperCase() +
                item.pokemon.name.substring(1)
              }
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

PokemonTypeModal.propTypes = {
  chosenType: PropTypes.string,
  url: PropTypes.string,
};
