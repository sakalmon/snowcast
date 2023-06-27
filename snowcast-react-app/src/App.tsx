import './App.scss';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PopularResorts from './components/PopularResorts';
import Search from './components/Search';
import ResortForecast from './components/ResortForecast';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<PopularResorts />} />
        <Route path='/search' element={<Search />} />
        <Route path='/resort_forecast' element={<ResortForecast />} />
      </Routes>
    </div>
  );
}

export default App;
