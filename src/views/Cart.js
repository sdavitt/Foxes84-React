import "../css/customCartStyling.css"
import { useContext } from "react"
import { DataContext } from "../context/DataProvider"
import { Link } from "react-router-dom";

const Cart = () => {
    /* 
    1. Access to my cart and setCart context
    2. Clear the entire cart
    3. Add one more of an item
    4. Remove one of an item
    5. Remove all of a single item from my cart
    */
    const { cart, setCart } = useContext(DataContext);

    const clearCart = () => {
        setCart({size: 0, total: 0, animals: {}});
    }

    const increaseQuantity = id => {
        // create a copy of current state
        let mutableCart = {...cart};
        // modify the copy
        mutableCart.size++;
        mutableCart.total += mutableCart.animals[id].data.price;
        mutableCart.animals[id].quantity++;
        // set state
        console.log(mutableCart);
        setCart(mutableCart);
    }

    const decreaseQuantity = id => {
        // create a copy of current state
        let mutableCart = {...cart};
        // modify the copy
        // same modification of overall cart size and total
        mutableCart.size--;
        mutableCart.total -= mutableCart.animals[id].data.price;
        // if more than one of that animal, decrease quantity
        // if only one of that animal, remove all info about that animal from the cart
        mutableCart.animals[id].quantity > 1 ?
        mutableCart.animals[id].quantity-- :
        delete mutableCart.animals[id]
        // set state
        console.log(mutableCart);
        setCart(mutableCart);
    }

    const removeItem = id => {
        // create a copy of current state
        let mutableCart = {...cart};
        // modify the copy
        // reduce size of cart by quantity of this item
        mutableCart.size -= mutableCart.animals[id].quantity;
        // reduce the total of the cart by the quantity of this item times the price of the item
        mutableCart.total -= mutableCart.animals[id].quantity*mutableCart.animals[id].data.price;
        // remove the animal
        delete mutableCart.animals[id]
        // set state
        console.log(mutableCart);
        setCart(mutableCart);
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Animals to adopt:</h4>
                    </div>
                    {Object.values(cart.animals).map((animal, index) => {
                        return <div key={index} className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div className="mr-1"><img className="rounded" alt={animal.data.sci_name} src={animal.data.image} width="70" /></div>
                            <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{animal.data.name}</span>
                                <div className="d-flex flex-row product-desc">
                                    <div className="size mr-1"><span className="font-weight-bold">{animal.data.sci_name}</span></div>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center qty">
                                <i className="fa fa-minus text-danger" onClick={() => {decreaseQuantity(animal.data.id)}}></i>
                                <h5 className="text-grey mt-1 mr-1 ml-1">{animal.quantity}</h5>
                                <i className="fa fa-plus text-success" onClick={() => {increaseQuantity(animal.data.id)}}></i>
                            </div>
                            <div>
                                <h5 className="text-grey">${animal.data.price.toFixed(2)} ea.</h5>
                            </div>
                            <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger" onClick={() => {removeItem(animal.data.id)}}></i></div>
                        </div>
                    })
                    }
                    <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                        <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">Total:</span>
                        </div>
                        <div>
                            <h4 className="text-grey">${cart.total.toFixed(2)}</h4>
                        </div>
                        <div className="d-flex align-items-center"><button className="btn btn-sm btn-danger" onClick={clearCart}>Clear Cart</button></div>
                    </div>
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><Link to="/" className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" disabled>Checkout</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Cart;