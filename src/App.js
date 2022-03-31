import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Shop from './views/Shop';
import Cart from './views/Cart';
import Checkout from './views/Checkout';

const App = () => {
  // set up a state variable
  const [students, setStudents] = useState(['Amir', 'Brandt', 'Cameron', 'Elif', 'Komal', 'Kyle', 'Lamont', 'Patrick']);

  return (
    <div className="App">
      <Navbar students={students}/>
      <Routes>
        {/* Any "page" of my react app can be defined as a Route within my Routes here */}
        <Route children path='/' element={<Home students={students} setStudents={setStudents}/>} />
        <Route children path='/shop' element={<Shop />} />
        <Route children path='/cart' element={<Cart />} />
        <Route children path='/checkout' element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
