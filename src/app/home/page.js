"use client"

import React from 'react';
import {checkout, init} from '@commercetools/checkout-browser-sdk';


const Home = () => {
    init({
        checkoutConfig: {
            projectKey: 'botonds-project-key',
            applicationKey: '123456789',
            host: 'https://app.checkout.europe-west1.gcp.commercetools.com',
            callbackUrl: 'https://frontend-test.mms.precomposer.shop/en',
            styles: {
                '--font-family': 'Comic Sans MS',
                '--checkbox': '#ff0000',
                '--radio': '#ff0000',
            },
            languageOverrides: {
                address: {
                    email: 'E-Mail-Addresse',
                    phone: 'Optionale Telefonnummer',
                    city: 'Stadt',
                },
            },
            forms: {
                default: {
                    address: {
                        fields: {
                            firstName: {
                                validation: {
                                    pattern: {
                                        value: /^[A-Z]/,
                                        message: 'The name must begin with a capital letter.',
                                    }
                                }
                            }
                        }
                    }
                }
            },
            logError: true,
            logInfo: true,
            logWarn: true
        }
    });

    const handleCheckout = () => {
        checkout({
            cartId: 'e2396bf5-b1fe-4aa2-9740-31f0017af17c',
            accessToken: '_fAjAOZatEtX-PzCJUiOQpJ2t5dkAqPW'
        });
    }

    return (
        <div>
            <h1>Checkout test</h1>
            <button onClick={handleCheckout}>Click</button>
        </div>
    );
};

export default Home