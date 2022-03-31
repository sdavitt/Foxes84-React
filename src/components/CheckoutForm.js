import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
import '../css/stripeElements.css';
import { DataContext } from '../context/DataProvider';
import PurchaseSuccess from './PurchaseSuccess';

const CheckoutForm = () => {
    // access our stripe setup thru hooks
    const stripe = useStripe();
    const elements = useElements();

    // access my confirm number context
    const {setConfirmOrder, cart} = useContext(DataContext);

    /* Logical flow for a payment
    1. Create payment intent based on cart (done in Checkout page/flask app)
    2. If stripe has loaded, the user submits their payment information
    3. Use the payment information alongside payment intent to confirm and process the payment thru stripe's api
    4. Display the status of the payment while we do that (unsubmitted -> processing -> complete/incomplete)
    5. Show confirmation page/clear cart/send an email? mailers are cool to explore/whatever else you gotta do after payment
    */

    // state hooks/vars to use for my conditionals/control what is shown on the page
    const [showPay, setShowPay] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // need to build out my functions/logic for accepting a payment -> what happens when I have the payment info
    // handlePay -> do our api call to stripe and handle communication with stripe about the payment
    const handlePay = async (event) => {
        // stop form submission from reloading the page
        event.preventDefault();
        setShowPay(false); // disable form submission and show processing
        // make the stripe api calls to confirm out payment
        const data = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });
        console.log('payment intent received: ', data);
        if (data['error']) {
            console.log(data['error']['code']);
            setErrorMessage(data['error']['message']);
            setShowForm('error');
        } else {
            setConfirmOrder({'number': data.paymentIntent.id, 'order': cart});
            setShowForm(false); // success
        }
    }

    return (
        <div className='container d-flex justify-content-center mt-3'>
            {
                showForm === true ?
                    <form id='payment-form' onSubmit={handlePay}>
                      <PaymentElement id='payment-element'></PaymentElement> 
                      <button disabled={!showPay || !stripe || !elements} id='submit' className='btn btn-info mt-3' >
                          <span id='button-text'>
                            {showPay ? 'Submit Payment' : 'Processing...'}
                          </span>
                      </button>
                    </form>
                : showForm === 'error' ?
                    <>
                        <h3>There was an error processing your payment. Please try again.</h3>
                        <h5>{errorMessage}</h5>
                    </>
                : <PurchaseSuccess />
            }
        </div>
    )

}

export default CheckoutForm;