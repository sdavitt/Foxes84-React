// imports at the top
import { useState, useEffect } from 'react';

// function definition for my component - return a single JSX element
const Home = props => {
    // component state and the concept of component lifecycle
    // component's state is essentially a collection of data/objects/functions associated with a specific lifecycle of that component
    // any time you're working with React and you see a function that is named use____() -> that is a hook
    // a hook provides special behavior that influences the lifecycle of a component
    const [animal, setAnimal] = useState('Fennec Fox'); // initial value of the state variable is set as the argument for the useState hook
    // why use state? Changing aka mutating state will cause the component to reload/rerender/update
    // cool - let's make a button to change the state
    const changeAnimal = () => {
        // Whenever you change a state variable
        // aka mutate state -> your goal is to update the page aka rerender/reload the component
        // this happens as a part of the state setter
        // whenever you mutate state you must make a copy of the current state (if applicable), modify the copy (if necessary)
        // then use the setter to mutate state
        if (animal === 'Fennec Fox'){
            setAnimal('Panda Bear'); // proper mutation of state
        } else {
            setAnimal('Fennec Fox');
        }
    }

    // typical mutation of state
    const changeStudentOrder = () => {
        // 1. access state and create a copy
        let studentscopy = [...props.students] // using the JS spread operator (...) to create a copy
        
        // 2. Modify the copy
        let popped = studentscopy.pop(); // remove last element
        studentscopy.splice(0, 0, popped); // insert removed element at start of array
        
        // 3. <optional> verify changes/testing
        console.log(props.students, studentscopy);
        
        //4. Last -> mutate the state through the proper setter (causing a rerender)
        props.setStudents(studentscopy);
    }

    // useEffect hook - required parameter: a callback function to run when the parent component (Home here) is rendered (initially loaded) or re-rendered (updated)
    useEffect(() => {console.log('Home component rendered or re-rendered!')});

    return (
        <div>
            <h1>Homepage! Welcome to React, Foxes!</h1>
            <h3>{animal}</h3>
            <button className='btn btn-secondary' onClick={changeAnimal}>Change Animal</button>
            <h1>Current Students:</h1>
            <button className='btn btn-secondary' onClick={changeStudentOrder}>Change Student Order</button>
            { props.students.map((student, index) => { /* index and key=index are just used to avoid unique key warning - helps computer differentiate between h3s*/
                return <h3 key={index}>{student}</h3>
            })}
        </div>
    );
}
// export that functional component
export default Home;