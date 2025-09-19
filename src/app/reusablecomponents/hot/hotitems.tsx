'use client';
import './hotitems.scss';
import { useQuery } from '@tanstack/react-query';
import SteelBallRun02 from '../steelball02/ball02';
import CartButton from '../button-addcart/cartbutton';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';




export default function Hotnow(){

    type queryType = {
        products: {
            id: number,
            name: string,
            shortdescription: string,
            longdescription: string,
            price: string,
            imageurl: string,
            ishot: boolean,
        }[];
    };

    
    const {data, isLoading, error} = useQuery<queryType | null>({
        queryKey: ["hot"],
        queryFn: async ()=> {
            const res = await fetch("/api/products?category=hot", {
                method: "GET",
                credentials: "include"
            })
            if (!res.ok) throw await res.json();
            return res.json();
        },
        refetchOnWindowFocus: false 
    });




    const containerRef = useRef<HTMLDivElement>(null);

        useEffect(()=>{

            if (containerRef.current){
            gsap.fromTo(containerRef.current, {
                opacity: 0
            }, {
                opacity: 1, duration: 2.5, ease: "power2.out"
            })
                }

    }, [data])


    //We need a <buttonComponent productId = {x.id}>
    return(
       <section className="hot-container">
        <SteelBallRun02/>
            {isLoading && <h2>Cargando...</h2>}
            {data &&             
                <>
                <h2>Lo más vendido</h2>
                <div className='hot' ref={containerRef}>
                    {
                    data?.products.map((x, i)=> (
                        <div className="hot-element" key={i}>
                            
                            <div className="hot-element-img">
                                <img src={x.imageurl} alt="" />
                            </div>

                            <div className="hot-element-text">
                                <h3>{x.shortdescription} - {x.name}</h3>
                                <p>{x.price} G</p>
                            </div>
                            
                            <CartButton productId={x.id}/>
                        </div>
                        ))
                    }
                </div>
                </>
            }
       </section>
    )
}

