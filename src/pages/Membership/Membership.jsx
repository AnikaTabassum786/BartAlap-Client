// import React from 'react';

// const Membership = () => {
//     return (
//         <div>
//             Membership
//         </div>
//     );
// };

// export default Membership;

import React from 'react';

import { loadStripe } from '@stripe/stripe-js';

import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key)

const Membership = () => {
    return (
        <Elements stripe={stripePromise}>
            <p className='text-center text-2xl font-semibold my-6 italic '> Membership Page for Payment</p>
            <PaymentForm ></PaymentForm>
          
        </Elements>
    );
};

export default Membership;