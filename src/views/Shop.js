// imports at the top

// function definition for my component - return a single JSX element
const Shop = props => {

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

    return (
        <div>
            <h1>Current Students:</h1>
            <button className='btn btn-secondary' onClick={changeStudentOrder}>Change Student Order</button>
            { props.students.map((student, index) => { /* index and key=index are just used to avoid unique key warning - helps computer differentiate between h3s*/
                return <h3 key={index}>{student}</h3>
            })}
        </div>
    );
}
// export that functional component
export default Shop;