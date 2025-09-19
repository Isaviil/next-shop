'use client';
import { useQuery } from '@tanstack/react-query';
import './basegame.scss';
import CartButton from '../reusablecomponents/button-addcart/cartbutton';
//import SteelBallRun02 from '../reusablecomponents/steelball02/ball02';


export default function Base(){

    type Product = {
        id: number,
        name: string,
        shortdescription: string,
        longdescription: string,
        price: string,
        imageurl: string,
        category: string
    }


   
    type productResponse = {
        products: Product[]
    }



    const {data, isLoading} = useQuery<productResponse>({
        queryKey: ["basegame"],
        queryFn: async ()=>{
            const res = await fetch ("/api/products?category=basegame", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        retry: false,
        refetchOnWindowFocus: false
    });


    return (
        <div className="base">

            {isLoading && <h2>Cargando...</h2>}
            {data?.products.length  && 
            
            <>
                <h2>Juego base</h2>
                <div className="base-container">
                    
                    <div className="base-container-img">
                        <img src={data.products[0].imageurl} alt="" />
                    </div>

                    <div className="base-container-text">

                        <div className="base-container-text-title">
                            <h2>{data.products[0].name}</h2>
                        </div>

                        <div className="base-container-text-description">
                            <p>{data.products[0].longdescription}</p>
                        </div>

                        <div className="base-container-text-options">
                            <CartButton productId={data.products[0].id}/>
                            <a href='https://www.youtube.com/watch?v=wKWSBwkCUe0' target='_blank'>Ver trailer</a>
                        </div>

                    </div>
                </div>
            </>
            
            }
        </div>
    )
}