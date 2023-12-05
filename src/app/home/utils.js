export  const extractCustomerIdFromScope = (inputString) => {
    const regex = /customer_id:([\w-]+)/;
    const match = inputString.match(regex);
  
    if (match && match[1]) {
      return match[1];
    } else {
      console.error('Customer_id not found in the input string');
      return null;
    }
    }

export const findCartsArrayByCustomerIdWithActiveStatus = (allCarts, customerId) => {
    const foundArray = allCarts.filter(cart => cart.cartState === "Active" && cart.customerId === customerId);

    if (foundArray.length) {
        return foundArray;
    } else {
        return null;
    }
} 

export const findCartIdByCustomerId = (cartArray, customerId) => {
    const foundObject = cartArray.find(cart => cart.customerId === customerId);
  
    if (foundObject) {
      return foundObject.id;
    } else {
      return null;
    }
  };

