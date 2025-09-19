'use client';
import './newest.scss';
import SteelBallRun01 from '../steelball01/ball01';
import { useQuery } from '@tanstack/react-query';
import CartButton from '../button-addcart/cartbutton';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function WhatsNew(){


    type newestType = {
        products: {
        price: string;
        imageurl: string;
        id: number;
        name: string;
        category: string | null;
        shortdescription: string;
        longdescription: string | null;
        }[]
    }


    const {data, isLoading} = useQuery<newestType | null>({
        queryKey: ["newest"],
        queryFn: async ()=>{
            const res = await fetch("/api/products?category=newest", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        refetchOnWindowFocus: false
    });




    //*Small animation for the container

    const containerRef = useRef<HTMLDivElement>(null);


    useEffect(()=>{

        if (containerRef.current){
            gsap.fromTo(containerRef.current, {
            opacity: 0
            }, {
                opacity: 1, duration: 2, ease: "power2.out"
                })
            }

    }, [data])



    //console.log(data?.products[0])
    return (
        <div className="whats-new">
            <SteelBallRun01/>

            {isLoading && <h2>Cargando ....</h2>}
            {data && 
                <>
                    <h2>Lo más reciente</h2>
                
                    <div className="whats-new-container" ref={containerRef}>
                        <div className="whats-new-container-img">
                            <img src={data?.products[0].imageurl} alt="" />
                        </div>
                
                        <div className="whats-new-container-text">
                            <div className="text-title">
                                <h3>{data?.products[0].name}</h3>
                            </div>
                
                            <div className="text-description">
                                <p>
                                    {data?.products[0].longdescription}
                                </p>
                            </div>
                
                            <div className="text-options">
                                {data?.products && <CartButton productId={data?.products[0].id}/>}
                                <a href="https://www.youtube.com/watch?v=rTHvzAhWfgA&ab_channel=IGN" target="_blank">
                                    Ver trailer
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}