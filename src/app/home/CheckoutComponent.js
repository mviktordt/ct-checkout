"use client";

import React, { useEffect, useState, useRef } from 'react';
import { checkout, init } from '@commercetools/checkout-browser-sdk';
import  {
    obtainAccessToken,
    checkoutConfig,
    getCartByUserId,
    getCarts
  } from '../ct-client';


const Home = () => {

  const [accessToken, setAccessToken] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await obtainAccessToken();
        setAccessToken(token.access_token);
        const customerIdExtr = extractCustomerIdFromScope(token.scope);
        setCustomerId(customerIdExtr);
        console.log('the extrected customer id is: ', customerIdExtr);
        //TODO - An active cart for the customer ****** does not exist.
        // getCartByUserId(customerIdExtr).then(cartId=>{
        //   console.log('cart id is: ', cartId);
        // })
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    if (!isMounted.current) {
      isMounted.current = true;
      if (accessToken === null) {
        fetchData();
      }
    }
  }, [accessToken]);

  const extractCustomerIdFromScope = (inputString) => {
    const regex = /customer_id:([\w-]+)/;
    const match = inputString.match(regex);
  
    if (match && match[1]) {
      return match[1];
    } else {
      console.error('Customer_id not found in the input string');
      return null;
    }
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getCarts();
          const allCarts = response.body.results;
          const cartId = findCartIdByCustomerId(allCarts, customerId);
          setCartId(cartId);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      if (customerId !== null) {
        fetchData();
      }
  
    }, [customerId]);

    const findCartIdByCustomerId = (cartArray, customerId) => {
      const foundObject = cartArray.find(obj => obj.customerId === customerId);
    
      if (foundObject) {
        return foundObject.id;
      } else {
        return null;
      }
    };

  const handleCheckout = () => {
    init({
      checkoutConfig
  });
    checkout({
      cartId,
      accessToken,
    });
  };


  return (
    customerId&&cartId&&accessToken&&<>
      <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#fff',
      }}
    >
      <h5 style={{ }}>Access Token: {accessToken}</h5>
      <h5 style={{ }}>Customer Id: {customerId}</h5>
      <h5 style={{marginTop:'15px' }}>Cart ID: {cartId}</h5>
      <button
        onClick={handleCheckout}
        style={{
          marginTop: '20px',
          padding: '15px',
          fontSize: '16px',
          backgroundColor: '#e74c3c', // Another color for the button
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '8px',
        }}
      >
        Go to Checkout
      </button>
    </div>
    </>
  );
};

export default Home;
