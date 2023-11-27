"use client";

import React, { useEffect } from 'react';
import  {
    getProjectDetails,
    getCategories
  } from '../ct-client';


const Home = () => {

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        getCategories().then(c=>{
            console.log('categories are these', c)
        })
        getProjectDetails().then(d=>{
          console.log('project details: ', d)
      })
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Hello Component</h1>
    </div>
  );
};

export default Home;
