import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useContext, useState } from 'react';
import { useUser } from 'reactfire';
import { DataContext } from '../context/DataProvider';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe("pk_test_51KjQNKEyxmEsTcLrcR16vxuyCopIuUC8nyV1vLe8vmUocIgr01Bzlaz1iD7ozeGNqAyOeQkzLrHjcUeCpKkTBC1C001TX6PBxX");

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState('');
    const { cart } = useContext(DataContext);
    const { data: user } = useUser();

    useEffect(() => {
        // create paymentintent as soon as this component renders by making an api call to our flask app
        if (user) {
            fetch("http://127.0.0.1:5000/pay/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 'cart': cart, 'user': user }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret))
                .catch((error) => setClientSecret(error));
        }
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <>
            {
            !user || clientSecret.error ?
            <h1>Please checkout from your cart.</h1>
            : !clientSecret ?
            <>
            <h1>Loading...</h1>
            <h5>Stuck? Don't reload this page. Try to checkout again from your cart page.</h5>
            </>
            :
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
            }
        </>
    )
}

export default Checkout;