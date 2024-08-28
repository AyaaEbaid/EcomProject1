import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export let CartContext = createContext();
export default function CartContextProvider(props) {
  const [noOfCartItems, setNoOfCartItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartId, setCartId] = useState(null)
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function addProductToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",

        { productId },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data.data._id);
        setCartId(response.data.data._id)
        setNoOfCartItems(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        toast.success(response.data.message);
        return response;
      })
      .catch((error) => {
        console.log(error);
        toast.error(response.data.message);
        return error;
      });
  }
  async function getCartProducts(productId) {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => {
        console.log(response);
        setCartId(response.data.data._id)
        setTotalPrice(response.data.data.totalCartPrice)
        setNoOfCartItems(response.data.numOfCartItems)
        
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  async function deleteProduct(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => {
        console.log(response);
        setNoOfCartItems(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  async function updateCartItems(productId, count) {
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        { headers 

        }
      ).then((response) => {
        console.log(response);
        setCartId(response.data.data._id)
        setTotalPrice(response.data.data.totalCartPrice)
        return response;
      }).catch((error) => {
        console.log(error);
        return error;
      });
  }
  async function onlinePayment(shippingAddress) {
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress
        },
        { headers 

        }
      ).then((response) => {
        console.log(response?.data?.session.url);
         setCartId(response?.data?.data?._id);
        setTotalPrice(response?.data?.data?.totalCartPrice);
        window.location.href=response?.data?.session.url;
        
       
        return response;
      }).catch((error) => {
        console.log(error);
        return error;
      });
  }
  async function cashPayment(shippingAddress) {
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress
        },
        { headers 

        }
      ).then((response) => {
        console.log(response);
        setCartId(response.data.data._id);
        setTotalPrice(response.data.data.totalCartPrice);
         window.location.href="http://localhost:5173/allorders"
      
        return response;
      }).catch((error) => {
        console.log(error);
        return error;
      });
  }
  
  async function clearCart() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        updateCartItems,
        deleteProduct,
        getCartProducts,
        clearCart,
        onlinePayment,
        cashPayment,
        noOfCartItems,
        totalPrice
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
