"use client";

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import  {
    obtainAccessToken,
    getCarts
  } from '../ct-client';
import { buttonStyle, subsection } from './styles';
import { extractCustomerIdFromScope, findCartIdByCustomerId } from './utils';

const Checkout = dynamic(
    () => import('./Checkout'),
    { ssr: false,  loading: () => <button style={{...buttonStyle, disabled:true}}>Go to Checkout</button>,
}
);


const HomeController = () => {

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

  return (
    customerId&&cartId&&accessToken&&<>
    <h1>Checkout test</h1>
      <div
      style={subsection}
    >
      <h5>Access Token: {accessToken}</h5>
      <h5>Customer Id: {customerId}</h5>
      <h5 style={{marginTop:'15px' }}>Cart ID: {cartId}</h5>
      <Checkout cartId={cartId} accessToken={accessToken}/>
    </div>
    </>
  );
};

export default HomeController;
