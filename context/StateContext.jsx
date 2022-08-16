import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

// type stateContextType  = {
//   setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
//   setCartItems: React.Dispatc>;
//   setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
//   setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
//   qty: number;
//   showCart: boolean;
//   cartItems;
//   totalPrice: number;
//   totalQuantities: number;
//   incQty: () => void;
//   decQty: () => void;
//   onAdd: (product, quantity: number) => void;
//   toggleCartItemQuanitity: (id: number, value: string) => void;
//   onRemove: (product) => void;
//   storage[];
// }


const StateContext = createContext();

// if (window !== undefined) {
//   var updatedFromLocalstorage = JSON.parse(localStorage.getItem('cartItems')!);
// }

export const StateContextProvider = ({ children }) => {

  //states
  const [showCart, setShowCart] = useState(false);
  const initialState = [];
  let def = 0
  const [cartItems, setCartItems] = useState(initialState);
  const [storage, setStorage] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct ;
  let index;



  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCartItems(cartData);
    }
    const cartPrice = JSON.parse(localStorage.getItem("price"));
    if (cartPrice) {
      setTotalPrice(cartPrice);
    }
  }, []);


  
  useEffect(() => {
    if (cartItems !== initialState) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    if (totalPrice !== def) {
      localStorage.setItem("price", JSON.stringify(totalPrice));
    }
  }, [cartItems, totalPrice]);

  

  //adding product
  const onAdd = (product, quantity) => {
    //check if product is present before adding by comparing ID
    const productInCart = cartItems.find((item) => item?._id === product._id);
    
    //update price and quantity regardless of if product is in the cart
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    //if product was present in the cartItems, increase the quantity of that particular product
    if (productInCart) {
      //map through every product so as to compare the newly added product then update the cart
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct?._id === product._id) return {
          ...cartProduct,
          //if product is present ,overwrite only the quantity
          quantity: cartProduct.quantity + quantity
        }
        
      })

      setCartItems(updatedCartItems);

    } else {
      //if product is not present , add as a new product
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
    return <Toaster />
  } 



  //Deleting products
  const onRemove = (product) => {
    //find the product
    foundProduct = cartItems.find((item )=> item._id === product._id);
    //filter the product from the cart
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    //update the states
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
    toast.error(`${product.name} deleted from the cart.`);
    return <Toaster />
  }



  const toggleCartItemQuanitity = (id, value) => {
    //find the product
    foundProduct = cartItems.find((item) => item._id === id)
    //find index of the product
    index = cartItems.findIndex((product) => product._id === id);
    //Remove the found product and make cart clean
    //clean cart
    const newCartItems  = cartItems.filter((item) => item._id !== id)

    if (value === 'inc') {
      //if value is increase, update state

      //update the quantity of the found product and add it to the clean cart changing only the quantity
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);

      //update state
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      toast.success(`one Item added to the cart.`);
    }
    
    
    else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        //update the quantity of the found product and add it to the clean cart decreasing only the quantity
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);

        //update state
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        toast.error(`one Item removed from the cart.`);
        return <Toaster />
      }
    }
  }



  //increase quantity by adding to previous quantity
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }


  //decrease quantity by subtracting from previous quantity
  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }


  return (
    <StateContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        storage
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);