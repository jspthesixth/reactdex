import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './components/layout/Dashboard';
import { PokemonInfo } from './components/pokemon/PokemonInfo';
import { PokemonTypeModal } from './components/pokemon/PokemonTypeModal';
import './components/global.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar title='Reactdex' />
        <PokemonTypeModal />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route
              exact
              path='/pokemon/:pokemonIndex'
              component={PokemonInfo}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
