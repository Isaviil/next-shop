'use client';
import useModalContext from '@/app/context/modal/modalContext';
import ESRB from '../../esrb/rate';
import './modalcart.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Decimal } from '@prisma/client/runtime/library';

export default function ModalCarrito(){

    //*Retrieving the session
    //const {data: session} = useSession();

    //*Ref for the fade of EACH product element
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const summaryRef = useRef<HTMLDivElement>(null);



    //*QueryClient
    const queryClient = useQueryClient();





    //ref
    const carritoRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef<boolean>(false);





    //Getting the context + provider for the modals
    const {modal, displayModal} = useModalContext();




    type cartType = {
            id: number,
            price: Decimal,
            name: string,
            shortdescription: string,
            longdescription: string | null,
            imageurl: string,
            ishot: boolean | null
    }[];

    type getQueryType = {
        message? : string,
        cart: cartType 
    }




    //*GET - Check if the cart is empty/ send the data to fill the cart
    const {data} = useQuery<getQueryType | null, {error: string}>({
        queryKey: ["cart"],
        queryFn: async ()=> {
            const res = await fetch("/api/cart-items", {
                method: "GET",
                credentials: "include"
            })
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        refetchOnWindowFocus: false,
        retry: false
    });










    //*DELETE ELEMENT FROM CART
    const mutaDelete = useMutation<
    {deleteMessage: string}, {error: string}, {productId: number}, {previousCart?: getQueryType }>({
        mutationFn: async (toSend)=>{
            const res = await fetch("/api/cart-items", {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify(toSend)
            })
            if (!res.ok) throw await res.json();
            return await res.json();
        },    

       //*productId:  mutaDelete.mutate({productId: x.id})
       onMutate: async ({ productId }) => {

        //*Cancel any outgoing query, but the frontend will still animate 
        await queryClient.cancelQueries({ queryKey: ["cart"] });

        //*This is the "screenshot" I'm talking about. IF the mutation fails, we use this.
        const previousCart = queryClient.getQueryData<getQueryType>(["cart"]);


        //*Optimistically update cart by removing the deleted item
        if (previousCart?.cart) {
        queryClient.setQueryData<getQueryType>(["cart"], {...previousCart, cart: previousCart.cart.filter((item) => item.id !== productId),
        });

        //*Target the whole container/whatever you want to animate.
        gsap.fromTo(
            carritoRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        );
        }

        //* Return context for rollback if mutation fails
        return { previousCart };
    },

        
        //*onError: (MutationError, DataSentToMutation, objectReturnedFromOnMutate)        
        onError: (_err, _variables, context) => {
            if (context?.previousCart) {
            queryClient.setQueryData(["cart"], context.previousCart);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["product"] });
        }  
    });










    //*POST METHOD - Buy/to orders

    const muta = useMutation<{success: string}, void, {cart: cartType}>({
        mutationFn: async (toSend)=> {
            const res = await fetch("api/orders",{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(toSend),
                credentials: "include"
            });
            if (!res.ok) throw await res.json();
            return await res.json()
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["cart"]})
        }
    });







    useEffect(() => {
    if (modal === "cart") {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const tl = gsap.timeline();
        tl.fromTo(carritoRef.current, {opacity: 1}, {opacity: 1, duration: .7, ease: "power3.out", 
            onComplete: () => {
            isAnimating.current = false;
            gsap.set(summaryRef.current, {pointerEvents: "auto"});
            }});
    }
    }, [modal]);



    const subtotal = data?.cart.reduce((a,b)=> a + Number(b.price), 0) ?? 0;
    const IGV = subtotal * 0.18;
    const total = subtotal + IGV;
    

    return (
        <div className="modal-cart" ref={carritoRef}>
            {
                muta.isSuccess? (
                    <div className="modal-cart-successful">
                        <h1>{muta.data?.success}</h1>
                        <button className='btnsuccess' onClick={() => displayModal("hide")}>Regresar</button>
                    </div>
                ): (
                    <>
                    <div className="modal-cart-description">
                <h1>Confirmación de compra(s)</h1>

                <div className="modal-cart-description-price">
                    <div className="modal-cart-description-price-element">
                        <p>Total articulos</p>
                        <p>{data?.cart.length}</p>
                    </div>

                    <div className="modal-cart-description-price-element">
                        <p>IGV</p>
                        <p>{IGV.toFixed(2)} G</p>
                    </div>

                    <div className="modal-cart-description-price-element">
                        <p>Subtotal</p>
                        <p>{subtotal.toFixed(2)} G</p>
                    </div>

                    <div className="modal-cart-description-price-element">
                        <p>Total</p>
                        <p>{total.toFixed(2)} G</p>
                    </div>

                    <div className="modal-cart-description-price-buttons">
                        <button onClick={()=> {
                        if (isAnimating.current){
                                return;
                        }
                        isAnimating.current = true;

                        const tl = gsap.timeline()

                        tl.fromTo(carritoRef.current, {opacity: 1}, {opacity: 0, duration: .5, ease: "power3.out", onComplete: ()=> {
                            isAnimating.current = false;
                            displayModal("hide")
                        }})
                        
                        }}>Regresar</button>
                        
                        <button onClick={()=> {
                                if (data?.cart) muta.mutate({cart: data.cart});
                            }}
                        
                        >
                            Pagar</button>
                    </div>
                </div>
            </div>

            <div className="modal-cart-products">
                {
                   data?.cart?.length? (
                    <>
                    <h2>Resumen de compras</h2>  


                    <div className="modal-cart-products-summary" ref={summaryRef}>
                        {
                            data.cart.map((x, i)=> (
                                <div className="modal-cart-products-summary-element" key={i} 
                                ref={el=> {itemsRef.current[i] = el}}>
                                    <div className="modal-cart-products-summary-element-img">
                                        <img src={x.imageurl} alt="" />
                                    </div>

                                    <div className="modal-cart-products-summary-element-text">
                                        <h3>{x.name}</h3>
                                        <h3>{x.price.toString()} G</h3>

                                        <div className="esrb-fit">
                                            <ESRB/>
                                        </div>

                                        <i className="bi bi-trash-fill" 
                                        onClick={()=> {    
                                            mutaDelete.mutate({productId: x.id});                                          
                                        }}></i>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    </>
                   ):
                   <p>{data?.message}</p>
                }
            </div>
                    </>
                )
            }
        </div>
    )   
}

