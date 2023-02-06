import './App.scss';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PopularResorts from './components/PopularResorts';

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <PopularResorts />
    </div>
  );
}

export default App;
