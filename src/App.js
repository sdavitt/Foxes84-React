import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Shop from './views/Shop';

const App = () => {
  // set up a state variable
  const [students, setStudents] = useState(['Amir', 'Brandt', 'Cameron', 'Elif', 'Komal', 'Kyle', 'Lamont', 'Patrick']);

  return (
    <div className="App">
      <Navbar students={students}/>
      <Routes>
        {/* Any "page" of my react app can be defined as a Route within my Routes here */}
        <Route children path='/' element={<Home />} />
        <Route children path='/shop' element={<Shop students={students} setStudents={setStudents}/>} />
      </Routes>
    </div>
  );
}

export default App;
