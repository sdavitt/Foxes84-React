// imports at the top
import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { DataContext } from '../context/DataProvider';

// function definition for my component - return a single JSX element
const Navbar = props => {
    const { cart } = useContext(DataContext);

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
                <li className="nav-item active">
                    <p className="nav-link m-0">{props.students[Math.floor(Math.random() * props.students.length)] /* pick a random element from the students array */}</p>
                </li>
                <li className="nav-item active">
                    { cart.size === 0 ?
                        <Link className="btn btn-info" to="/shop"><i className="fa fa-shopping-cart"></i></Link> :
                        <Link className="btn btn-info" to="/cart"><i className="fa fa-shopping-cart mr-1"></i>{cart.size} | ${cart.total.toFixed(2)}</Link>
                    }
                </li>
            </ul>
        </nav>
    );
}
// export that functional component
export default Navbar;