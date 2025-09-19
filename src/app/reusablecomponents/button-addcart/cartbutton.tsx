'use client';
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import './cartbutton.scss';
import useModalContext from "@/app/context/modal/modalContext";
import useCartOrderContext from "@/app/context/cart-order/cartOrderContext";



  interface CartButtonProps {
    productId: number;
    warning?: string; 
    error?: string;
    message?: string;
  }


//*Specify the product you'll send to the backend 

export default function CartButton({productId, warning, error, message}: CartButtonProps){


    const queryClient = useQueryClient();

    
    const {data: session} = useSession();

    const {modal, displayModal} = useModalContext();

    const muta = useMutation<void, void, {productId: number}>({


      mutationFn: async ({productId})=>{
        const res = await fetch("/api/cart-items", {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({productId}), //*What we want to send to prisma
          credentials: "include"
        })
        if (!res.ok) throw await res.json();
        return await res.json();
      }, onSuccess: ()=>{
          //console.log(muta.data)
          queryClient.invalidateQueries({queryKey: ["cart"]})
          queryClient.invalidateQueries({queryKey: ["product"]})   
      }
    });


    //Get your object from the context
    const { cart, orders } = useCartOrderContext();

    //check if it exists already
    const inCart = cart.some(item => item.id === productId);
    const purchased = orders.some(item => item.products.id === productId);


    
    return (
        <button className="btn" disabled= {muta.status === "pending"}
        onClick={
          ()=>{
            if (session){
              if (productId){
                muta.mutate({productId})
              }
            } else{
              displayModal("login");
            }
          }
        }
        >

        {session && purchased? "Producto adquirido": inCart? "En el carrito": "Agregar al carrito" }

        </button>
    )

}