'use client';
import './orders.scss';
import { useQuery } from '@tanstack/react-query';
import SteelBallRun01 from '../reusablecomponents/steelball01/ball01';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';


    type queryType = {
        cart: {
            id: number,
            userid: number,
            productid: number,
            orderdate: string,
            products: {
                id: number,
                name: string,
                shortdescription: string,
                longdescription: string,
                price: string,
                imageurl: string,
                category: string
            };
        }[]
    }

    

export default function Orders(){


    const ordersRef = useRef<HTMLDivElement>(null);



    const {data, isLoading} = useQuery<queryType>({
        queryKey: ["orders"],
        queryFn: async ()=> {
            const res = await fetch("/api/orders", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        refetchOnWindowFocus: false
    });



    useEffect(()=>{

        if (data){
            gsap.fromTo(ordersRef.current, {opacity: 0}, {opacity: 1, duration: 2, ease: "power2.out"})
        }

    }, [data])



    return(
        <div className="orders">
            <SteelBallRun01/>
            
            {isLoading && <h2>Cargando...</h2>}
            {data && 
            <>
                <h1>Mis compras</h1>       
                <div className="orders-container" ref={ordersRef}>                     
                    
                    <div className="orders-container-data">
                        
                        {data?.cart?.map(x => (
                        <div className="orders-container-data-row" key={x.id}>                    
                            <div className="orders-container-data-row-img">
                                <img src={x.products.imageurl} alt="" />
                            </div>

                            <div className="orders-container-data-row-text">
                                <p>Id de compra: {x.id}</p>
                                <p>{x.products.name}</p>
                                <p>{x.products.shortdescription}</p>
                                <p>{new Date(x.orderdate).toLocaleString()}</p>
                                <p>{x.products.price}G</p>
                            </div>
                        </div>
                        ))}
                    </div>    


                </div>
            </>
            }
            
        </div>
    )
}

