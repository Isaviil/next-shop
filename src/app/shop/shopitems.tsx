'use client';
import { useQuery } from "@tanstack/react-query";
import "./shopitems.scss";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

    type Product = {
        id: number,
        name: string,
        shortdescription: string,
        longdescription: string,
        price: string,
        imageurl: string,
        category: string
    }

    type productResponse = {products: Product[]}

export default function Shop(){

    const router = useRouter();

    const {data, isLoading, error} = useQuery<productResponse>({
        queryKey: ["shop"],
        queryFn: async ()=>{
            const res = await fetch("/api/products", {
                method: "GET",
                credentials: "include"
            })
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        refetchOnWindowFocus: false,
        retry: false
    });


    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        if (containerRef.current){
            gsap.fromTo(containerRef.current, {opacity: 0}, {opacity: 1, duration: 2, ease: "power2.out"})
        }

    }, [data?.products])



    return (
        <div className="shop">
            {isLoading && 
                <div className="shop-cargando">
                    <div className="shop-cargando-img">
                        <img src={"/images/icons/JackoWhoopsie.gif"} alt="" />
                    </div>
                    <h2>Cargando...</h2>
                </div>}
            {data?.products && 
                <>

                <div className="shop-title">
                    <h1>Add-Ons</h1>
                </div>

                <div className="shop-items" ref={containerRef}>
                    {data.products.map((x, i)=> (
                        <div className="shop-items-element" key={i}>
                            <div className="shop-items-element-img" onClick={()=> {router.push(`/itempreview?id=${x.id}`)}}>
                                <img src={x.imageurl} alt="" />
                            </div>

                            <div className="shop-items-element-text">
                                <p>{x.shortdescription}</p>
                                <p>{x.name}</p>
                                <p>{x.price} G</p>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            }
        </div>
    )
}