"use client"
import React, {useEffect} from 'react';
import {checkout} from "@commercetools/checkout-browser-sdk";

const CheckoutComponent = () => {
    useEffect(() => {
        import('@commercetools/checkout-browser-sdk').then(({init}) => {
            init({
                    checkoutConfig: {
                        projectKey: 'botonds-project-key',
                        applicationKey: '123456789',
                        host: 'https://app.checkout.europe-west1.gcp.commercetools.com',
                        callbackUrl: 'https://frontend-test.mms.precomposer.shop/en'
                    },
                styles: {
                    '--font-family': 'Comic Sans MS',
                    '--checkbox': '#1daac2',
                    '--radio': '#80b778',
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
            );
        });
    }, []);

    const handleCheckout = () => {
        checkout({
            cartId: '5b59b5b8-e2f2-4236-9960-c6546f9fc0c4',
            accessToken: '1xXa6LqSur6BIHwdyRVG83-uxAS0lTkL'
        });
    };

    return (
        <div>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default CheckoutComponent;
