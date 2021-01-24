import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HttpService from '../../../services/http-service';
import './CheckoutForm.css';


const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#5ba1f7',
            color: '#a9b4f2',
            fontWeight: 700,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '20px',
            fontSmoothing: 'antialiased',
            backgroundColor: '#d9dddc',
            lineHeight: '60px',
            padding: '50px 10px',
            ':-webkit-autofill': { color: '#fce883' },
            '::placeholder': { color: '#87bbfd' },
        },
        '::placeholder': {
            color: '#87bbfd',
        },
        invalid: {
            iconColor: '#ffc7ee',
            color: 'black',
        },
    },
};
const CheckoutForm = (props) => {

    const stripe = useStripe();
    const elements = useElements();
    const { state } = useLocation();
    const userId = useSelector(state => state.userReducer.user._id)
    const handleSubmit = async event => {
        event.preventDefault()
        if (!stripe || !elements) return
        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        })
        if (error) {
            console.log('error', error)
        }
        else {
            console.log('PaymentMethod', paymentMethod)
            new HttpService().postPaymentMethod(paymentMethod.id, state.product._id, userId)
                .then(data => console.log(data))
        }
    }

    return (
        <div className="checkout-container">
            <div className="checkout-product">
                <div className="checkout-product-element"><img src={`http://localhost:3008/${state.product.imagePath}`} /></div>
                <div className="checkout-product-element"><h4>{state.product.title}</h4></div>
            </div>
            <form onSubmit={handleSubmit} className="checkout-form">
                <CardElement options={CARD_OPTIONS} />
                <button
                    className="btn btn-lg btn-outline-secondary checkout-button"
                    type="submit" disabled={!stripe}>
                    Pay {state.product.price}$
                </button>
            </form>

        </div >
    )
};

//4000001240000000 canada card number
export default CheckoutForm;