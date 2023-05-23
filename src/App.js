
import './App.css';
import Navbar from './Navbar/Navbar.js';
import {
  HashRouter as Router,
  Route,
  Routes,
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
        <Routes>
          <Route path="/ReactMovie/" exact="true" element={<Home />} active>
          </Route>
          <Route path="/ReactMovie/movie" exact="true" element={<Movie />}>

          </Route>
          <Route path="/ReactMovie/tv" element={<TV />}>
          </Route>

          <Route path="/ReactMovie/film/:movieortv/:id" element={<Film />} >
          </Route>
        </Routes>
      </div>
    </Router >
  );
}

export default App;
