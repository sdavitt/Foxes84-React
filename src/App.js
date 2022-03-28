import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Shop from './views/Shop';

const App = () => {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Any "page" of my react app can be defined as a Route within my Routes here */}
        <Route children path='/' element={<Home />} />
        <Route children path='/shop' element={<Shop />} />
      </Routes>
    </div>
  );
}

export default App;
