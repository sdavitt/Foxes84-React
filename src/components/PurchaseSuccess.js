import { useContext, useEffect } from 'react';
import { useDatabase, useUser } from 'reactfire';
import { set, ref } from 'firebase/database';
import { DataContext } from '../context/DataProvider'

const PurchaseSuccess = () => {
    // get access to all contexts/state vars we need
    const db = useDatabase();
    const { data: user } = useUser();
    const { setCart, confirmOrder } = useContext(DataContext);

    useEffect (() => {
        // update flask inventory
        fetch("https://foxes84-tweetyer.herokuapp.com/api/inventoryupdate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(confirmOrder.order),
            })
            .then((res) => console.log(res.json()))
        // clear user cart
        set(ref(db, `carts/${user.uid}`), null);
        // clear local cart
        setCart({
            total: 0,
            size: 0,
            animals: {}
        })
    }, [])

    return (
        <div className='container'>
            <h3>Thank you for your purchase! We'll be in touch about your order.</h3>
            <h4>Your confirmation number is: {confirmOrder.number}</h4>
            { Object.values(confirmOrder.order.animals).map((animal, index) => {
                return <h5 key={index}>{animal.quantity} | {animal.data.name} | ${(animal.data.price*animal.quantity).toFixed(2)}</h5>
            })}
        </div>
    )

}

export default PurchaseSuccess;