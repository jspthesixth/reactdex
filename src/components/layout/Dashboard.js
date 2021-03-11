import { PokemonList } from '../pokemon/PokemonList';
import { Search } from './Search';

export const Dashboard = () => {
  return (
    <div className='row'>
      <div className='col'>
        <Search />
        <PokemonList />
      </div>
    </div>
  );
};
