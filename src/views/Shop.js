// imports at the top
import axios from "axios";
import { useState, useContext } from "react";
import { DataContext } from "../context/DataProvider";

// function definition for my component - return a single JSX element
const Shop = () => {
    /* 
    1. Make an API call to our flask app - axios
    2. set up a state variable for our products
    3. set that state variable based on the results of our api call
    4. Set up conditional JSX templating such that if we have products, we display them. Otherwise, we display loading.
    */

    // make api call to our flask app
    const getAnimalData = async () => {
        let response = await axios.get('https://foxes84-tweetyer.herokuapp.com/api/animals');
        return response.status === 200 ? response.data : null
    }

    // loading the api call response data into our state variable
    const loadAnimalData = async () => {
        let data = await getAnimalData();
        console.log(data.Animals, typeof data.Animals);
        // take this data and set our state variable with it
        setAnimals(data.Animals);
    }

    // state variable setup
    const [animals, setAnimals] = useState(() => loadAnimalData());

    // access our cart from our Context.Provider as well as its setter
    const {cart, setCart} = useContext(DataContext);

    // function to adopt an animal (aka add to cart)
    const adoptAnimal = (animal) =>{
        // add the animal to our cart object - CANNOT MUTATE STATE DIRECTLY
        // make a copy
        let mutableCart = {...cart}
        // modify the copy
        // increase size by one
        mutableCart.size++;
        // increase total by animal.price
        mutableCart.total += animal.price;
        // if the animal is in the cart already, increase quantity by one, otherwise add the animal to the cart
        mutableCart.animals[animal.id] ?
        mutableCart.animals[animal.id].quantity++ :
        mutableCart.animals[animal.id] = {'data': animal, 'quantity': 1};
        // testing console log
        console.log(mutableCart);
        // set state
        setCart(mutableCart);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1>Foxes Animal Market</h1>
            </div>
            <div className="row">
                {/* cards for each animal once the animals have actually loaded */}
                {typeof animals === 'object' && !animals.then ? animals.map((animal, index) => {
                    return <div key={index} className="card m-3" style={{width: 18 + 'rem'}}>
                        <img src={animal.image} className="card-img-top" alt={animal.name} />
                        <div className="card-body">
                            <h5 className="card-title">{animal.name}</h5>
                            <h5 className="card-title font-italic">{animal.sci_name}</h5>
                            <p className="card-text">{animal.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{animal.habitat}</li>
                            <li className="list-group-item">{animal.diet}</li>
                            <li className="list-group-item"><span className="float-left">Lifespan: {animal.lifespan} years</span><span className="float-right">Size: {animal.size}</span></li>
                        </ul>
                        <div className="card-body"> 
                            <p className="card-link"><span className="float-left">${animal.price.toFixed(2)}</span><span className="float-right btn btn-sm btn-secondary" onClick={() => adoptAnimal(animal)}>Adopt</span></p>
                        </div>
                    </div>
                }) :
                    <h1>Waking up animals...</h1>
                }
            </div>
        </div>
    );
}
// export that functional component
export default Shop;