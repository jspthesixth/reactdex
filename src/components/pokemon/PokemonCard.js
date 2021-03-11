import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { Image, Card, StyledLinkComponent } from '../styles';
import imgPlaceholder from '../../assets/questionMark.svg';
import spinner from '../../assets/spinner.gif';
import '../global.css';

export const PokemonCard = forwardRef(({ name, pokemonIndex, modal }, ref) => {
  const [imgLoading, setImgLoading] = useState(true);

  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonIndex}.svg`;

  return (
    <div ref={ref} className='col-md-3 col-sm-6 mb-5'>
      <StyledLinkComponent
        to={!modal ? `pokemon/${pokemonIndex}` : pokemonIndex}
        target='_blank'
      >
        <Card className='card noselect'>
          <h5 className='card-header'>{`#${pokemonIndex}`}</h5>
          {imgLoading ? (
            <Image
              className='card-img-top rounded mx-auto mt-2'
              src={spinner}
              alt='Loading image...'
              display={+imgLoading}
            />
          ) : null}
          <Image
            className='card-img-top rounded mx-auto mt-2'
            src={imageURL}
            alt={`${name}IMG`}
            display={+!imgLoading}
            onLoad={() => setImgLoading(false)}
            onError={(e) => {
              if (e.target.src !== imgPlaceholder) {
                e.target.onerror = null;
                e.target.src = imgPlaceholder;
              }
            }}
          />
          <div className='card-body mx-auto'>
            <h6>{name}</h6>
          </div>
        </Card>
      </StyledLinkComponent>
    </div>
  );
});

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  pokemonIndex: PropTypes.string.isRequired,
  modal: PropTypes.bool,
};
