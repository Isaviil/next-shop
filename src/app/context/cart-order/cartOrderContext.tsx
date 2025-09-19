import { createContext} from "react";
import React from "react";



export type CartItem = {
  id: number;
  price: string;
  name: string;
  shortdescription: string;
  longdescription?: string | null;
  imageurl: string;
  ishot?: boolean | null;
};


//If the cart is empty, we return this
export type CartResponse = {
  cart: CartItem[];
  message?: string;
};

//to match the response from the backend
export type OrderItem = {
  id: number;
  userid: number;
  productid: number;
  orderdate: string;
  products: {
    id: number;
    name: string;
    shortdescription: string;
    longdescription: string | null;
    price: string;
    imageurl: string;
    category: string;
  };
};


// This matches exactly what your API returns
export type OrdersResponse = {
  cart: OrderItem[];
  message?: string; 
};



export type CartOrdersContextType = {
  cart: CartItem[];
  orders: OrderItem[];
  refetchCart: () => void;
  refetchOrders: () => void;
};


//tenias cartOrderContextt
export const cartOrderContext = createContext<CartOrdersContextType | null>(null);

//useCartOrderContext
export default function useCartOrderContext(){
    const context = React.useContext(cartOrderContext);
    if (!context){
        throw new Error("El contexto cart y order no existe");
    }
    return context;
}