"use client";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OrdersResponse, CartOrdersContextType, CartResponse } from "./cartOrderContext";
import { cartOrderContext } from "./cartOrderContext";

// Types for props
type CartOrderProviderProps = {
  children: ReactNode;
};

export function CartOrderProvider({ children }: CartOrderProviderProps) {
  
  
  
  
  const queryClient = useQueryClient();

  const { data: session } = useSession();


  useEffect(()=>{

    if (session){
      cartQuery.refetch();
      ordersQuery.refetch();
    }

  }, [session])




  // Fetch cart items
  const cartQuery= useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart-items", { credentials: "include" });
      if (!res.ok) throw await res.json();
      return await res.json();
    },
    refetchOnWindowFocus: false,
    retry: false
  });



  // Fetch orders
  const ordersQuery = useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders", { credentials: "include" });
      if (!res.ok) throw await res.json();
      return await res.json();
    },
    refetchOnWindowFocus: false,
    retry: false
  });


  const value: CartOrdersContextType = {
    cart: cartQuery.data?.cart || [],
    orders: ordersQuery.data?.cart || [], 
    refetchCart: cartQuery.refetch,    
    refetchOrders: ordersQuery.refetch, 
  };

  return <cartOrderContext.Provider value={value}>{children}</cartOrderContext.Provider>;
}