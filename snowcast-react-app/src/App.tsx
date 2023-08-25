import './App.scss';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PopularResorts from './components/PopularResorts';
import Search from './components/SearchBox';
import ResortForecast from './components/ResortForecast';
import { UnitContextProvider } from './UnitContext';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <UnitContextProvider>
        <Header />
        <Navigation />
        <Routes>
          <Route path='/' element={<PopularResorts />} />
          <Route path='/search' element={<Search />} />
          <Route path='/resort_forecast' element={<ResortForecast />} />
        </Routes>
      </UnitContextProvider>
    </div>
  );
}

export default App;
