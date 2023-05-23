
import './App.css';
import Navbar from './Navbar/Navbar.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Film from './Film/Film';
import Home from './Home/Home.js'
import Movie from './Movie/Movie.js'
import TV from './TV/TV.js'
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/movie">
            <Movie />
          </Route>
          <Route path="/tv">
            <TV />
          </Route>
          <Route path="/film/:movieortv/:id" render={(props) => <Film {...props} />}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
