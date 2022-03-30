// imports at the top
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataProvider';
import { useAuth, useUser, useDatabase } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { get, ref, child } from 'firebase/database';

// function definition for my component - return a single JSX element
const Navbar = props => {
    // gives our Navbar component access to the cart context
    const { cart, setCart } = useContext(DataContext);
    // give our Navbar access to our auth system - useAuth hook from reactfire
    const auth = useAuth();

    // we also need to work with a 'user' in this scenario and there are reactfire hooks for that
    // useUser hook to access our user object
    // useSigninCheck hook to help determine current user status
    const { status, data: user } = useUser();
    const db = useDatabase();

    // set up functions to sign a user in or sign a user out
    const signin = async () => {
        let provider = new GoogleAuthProvider();
        let u = await signInWithPopup(auth, provider);
        console.log(u);
    }

    const signout = async () => {
        await signOut(auth).then(() => console.log('signed user out', user)); // the .then() isn't necessary - just there for testing/dev feedback
        setCart({size: 0, total: 0, animals: {}});
    }
    
    // every time there is a render or re-render of the navbar, we want to check for a change in user status
    // if the user has changed, check for a cart for that user in the database and update our local cart to the proper user cart
    useEffect(() => {
        // function to get a cart for this user, if there is a user and they have a cart
        if (user) { // if there is a user logged in (aka this was a sign-in event)
            console.log(user);
            // check the database for a cart for that user
            get(child(ref(db), `carts/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                  setCart(snapshot.val());
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
        }
    }, [user]);

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
                { /* 
                If a user is signed in, show a signout button and show their name 
                If a user is not signed in, show a login button
                If the user is loading show something else
                */
                status === 'loading' ?
                    <li className="nav-item active mr-2">
                        <button className="btn btn-info" disabled>Logging in...</button>
                    </li> :
                user ?
                    <>
                        <li className="nav-item active">
                            <p className="nav-link m-0">{user.displayName}</p>
                        </li>
                        <li className="nav-item active mr-2">
                            <button className="btn btn-info" onClick={signout}>Logout</button>
                        </li>
                    </> :
                <li className="nav-item active mr-2">
                    <button className="btn btn-info" onClick={signin}>Login</button>
                </li>
                }
                <li className="nav-item active">
                    {cart.size === 0 ?
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