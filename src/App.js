
import './App.css';
import Navbar from './Navbar/Navbar.js';
import {
  BrowserRouter as Router,
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
          <Route path="/" exact={true} element={<Home />}>
          </Route>
          <Route path="/movie" element={<Movie />}>

          </Route>
          <Route path="/tv" element={<TV />}>

          </Route>
          <Route path="/film/:movieortv/:id" render={(props) => <Film {...props} />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
