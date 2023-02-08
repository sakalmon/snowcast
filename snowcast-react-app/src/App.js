import './App.scss';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PopularResorts from './components/PopularResorts';
import Search from './components/Search';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<PopularResorts />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
