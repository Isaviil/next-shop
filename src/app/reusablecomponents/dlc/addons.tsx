'use client';
import { useQuery } from '@tanstack/react-query';
import './addons.scss';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function Addons(){

    const router = useRouter();

    type addonsType = {
        products: {
            id: number;
            name: string;
            category: string | null;
            shortdescription: string;
            longdescription: string | null;
            price: string;
            imageurl: string;
        }[];
    }





    const {data, isLoading} = useQuery<addonsType | null>({
        queryKey: ["addons"],
        queryFn: async ()=>{
            const res = await fetch("/api/products?category=base&limit=6", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        refetchOnWindowFocus: false
    })



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







    //console.log(data?.products);

    return (
        <section className='addons-container'>
            {isLoading && <h2>Cargando ...</h2>}
            {data &&
                <>                
                    <h2> Add-Ons </h2>
                    <div className="addons" ref={containerRef}>
                        {
                            data?.products.map((x, i)=> (
                                <div className='addons-element' key={i}>
                                    <div className="addons-element-img" onClick={()=> {router.push(`/itempreview?id=${x.id}`)}}>
                                        <img src={x.imageurl} alt={x.name} />
                                    </div>

                                    <div className="addons-element-text">
                                        <p>Personaje adicional</p>
                                        <p>{x.name}</p>
                                        <p>{x.price} G</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <button onClick={()=> router.push("/shop")}> Ver más </button>
                
                </>
            }
        </section>
    )
};