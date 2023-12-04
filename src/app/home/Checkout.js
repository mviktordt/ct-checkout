"use client";
import { checkout, init } from '@commercetools/checkout-browser-sdk';
import { checkoutConfig } from '../ct-client';
import { buttonStyle } from './styles';

const Checkout = ({cartId, accessToken}) => {

    const handleCheckout = () => {
        init({
          checkoutConfig
      });
        checkout({
          cartId,
          accessToken,
        });
      };

      return(
        <button
        onClick={handleCheckout}
        style={buttonStyle}
      >
        Go to Checkout
      </button>
      )

}

export default Checkout;