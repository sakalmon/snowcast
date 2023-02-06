import './App.scss';
import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PopularResorts from './components/PopularResorts';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Navigation />
        <PopularResorts />
      </div>
    );
  }
}

export default App;
