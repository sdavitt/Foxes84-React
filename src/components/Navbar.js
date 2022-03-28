// imports at the top
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// function definition for my component - return a single JSX element
const Navbar = props => {

    useEffect(() => { console.log('Navbar component rendered or re-rendered!') });

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <ul className="nav navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/shop">Shop</Link>
                </li>
            </ul>
            <ul className='nav navbar-nav ml-auto'>
                <li className="nav-item active ml-auto">
                    <p className="nav-link m-0">{props.students[Math.floor(Math.random() * props.students.length)] /* pick a random element from the students array */}</p>
                </li>
            </ul>
        </nav>
    );
}
// export that functional component
export default Navbar;