import React from 'react';
import dynamic from 'next/dynamic';

const CheckoutComponentWithNoSSR = dynamic(
    () => import('./CheckoutComponent'),
    { ssr: false }
);

const Home = () => {

    
    return (
        <div>
            <h1>Checkout test</h1>
            <CheckoutComponentWithNoSSR />
        </div>
    );
};

export default Home;