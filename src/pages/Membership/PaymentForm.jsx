import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const axiosInstance = useAxios();
    const { user } = useAuth()

    const amount = 1
    const amountInCents = amount * 100;
    console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)

            // console.log('error', error)
        }
        else {
            setError('')
            // console.log('Payment method', paymentMethod)

            const res = await axiosInstance.post('/create-payment-intent', {
                amountInCents

            })

            console.log('res from intent', res)
            const clientSecret = res.data.clientSecret
            console.log(clientSecret)


            // step-3: confirm payment

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email,

                    },
                },
            });
            if (result.error) {
                setError(result.error.message)
            }
            else {
                setError('')
                if (result.paymentIntent.status === 'succeeded') {
                    // console.log('Payment Done Success')
                    // toast.success('Payment Done Successfully!', { position: 'top-right' });
                    // console.log(result)

                    try {
                        const upgradeRes = await axiosInstance.patch(`/users/upgrade/${user.email}`);
                        console.log('Badge upgraded:', upgradeRes.data);
                        // alert("Payment successful! You've been upgraded to Gold member.");
                        toast.success('Payment Done Successfully!', { position: 'top-right' });
                    } catch (err) {
                        console.error('Badge upgrade failed:', err);
                    }
                }
            }

        }
    }

    return (
        <div className='mt-20'>


            <form onSubmit={handleSubmit} className=" space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement>

                </CardElement>
                <button type='submit' disabled={!stripe} className='btn bg-blue-100 text-blue-500  hover:bg-blue-200'>
                    Pay {amountInCents} Cents for Membership
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;