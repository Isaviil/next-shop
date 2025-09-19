'use client'
import Addons from "../reusablecomponents/dlc/addons";
import GameInfo from "../reusablecomponents/gameinfo/gameinf";
import ESRB from "../reusablecomponents/esrb/rate";
import ExtraInfo from '../reusablecomponents/extrainfo/extra';
import "./preview.scss";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ItemPreview(){

    type previewType = {
        products?: {
        price: string;
        imageurl: string;
        id: number;
        name: string;
        category: string | null;
        shortdescription: string;
        longdescription: string;
        }[],
        error?: string,
    }



    //*Retrieving the id sent by the click


    const searchParams = useSearchParams();


    
    const id = Number(searchParams.get("id"))




    const {data, isLoading, error} = useQuery<previewType | null, {error: string}>({
        queryKey: ["preview", id],
        queryFn: async()=>{
            const res = await fetch(`/api/products?id=${id}`, {
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

    }, [data])


    return (
       
        <div className="preview">
            {error?.error && <div className="preview-error-msg"><p>{error.error}</p></div>}

            {isLoading && <div className="preview-loading-msg"><h2>Cargando...</h2></div>}

            {data?.products && data?.products.length>0 &&<div className="preview-container" ref={containerRef}>

                
                {data && 
                
                    <>                    
                    <div className="preview-container-text">
                        <div className="preview-container-text-game">
                            <GameInfo products={data?.products[0]}/>
                        </div>
                        
                        <div className="preview-container-text-esrb">    
                            <ESRB/>
                        </div>      
                        
                        <div className="preview-container-text-extra">
                            <ExtraInfo/> 
                        </div>                                  
                    </div>
                

                    <div className="preview-container-img">
                    {data?.products?.length && <img src={data?.products[0].imageurl} alt="" />}
                    </div>

                    </>
                }

            </div>}

            <Addons/>
        </div>

    )
}