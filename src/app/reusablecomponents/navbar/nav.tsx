'use client';
import UseTheme from '@/app/context/theme/themeContext';
import './nav.scss';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ShowModal from '@/app/context/modal/modalContext';
import { useSession } from 'next-auth/react';
import IsAnimating from '@/app/context/is-animating/animatingContext';
import { useRouter } from "next/navigation";
import { Decimal } from '@prisma/client/runtime/library';
import { useQuery } from '@tanstack/react-query';



export default function Navbar(){

    //*Theme change
    const {theme, displayTheme} = UseTheme();


    //*display modal context
    const {isAnimatingContext, changeisAnimating} = IsAnimating();

    

    const router = useRouter();



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
    const {data, isLoading, error} = useQuery<getQueryType | null, {error: string}>({
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






    //*Theme colors on theme change
    useEffect(()=> {

        document.body.setAttribute("data-theme", theme==="dark"? "dark": "light")

        gsap.to(document.body, {
            duration: .5,
            ease: "power2.out",
            css: {
            "--color-regular-text": theme === "dark"? "rgb(255, 255, 255)" : "black",
            "--color-black": theme === "dark"? "black": "white",
            "--color-01": theme === "dark"? "#131618e7": "#ece5e5ec",
            "--color-02": theme === "dark"? "#111821": "rgb(228, 228, 228)",
            "--color-03": theme === "dark"? "#d63d00": "#facf59",
            "--color-04": theme === "dark"? "#5c1e07": "#e9bf04",
            "--color-06": theme === "dark"? "rgb(34, 34, 34)": "rgb(204, 204, 204)",
            "--color-07": theme === "dark"? "rgb(71, 71, 71)": "rgb(160, 160, 160)",
            "--color-08": theme === "dark"? "#101a25c5": "#d6e7fc73",
            "--footer-color-01": theme === "dark"? "#0d0f11e7": "#d6e7fc73"
            }
        });

    }, [theme]);


    //*Retrieving the session
    const {data: session} = useSession();


    //*Display log in modal

   
    const {displayModal} = ShowModal();
    


    return (
        <nav>
            <div className="general-data">

                <button className="left-side" onClick={displayTheme}>
                    {
                        theme === "dark"?
                        <i className="bi bi-sun"></i>                    
                        :
                        <i className="bi bi-moon"></i>
                    }
                </button>

                <h3 onClick={()=> router.push("/homePage")}>STRIVE</h3>
            </div>

            {
                session?
                <div className='user-data'>
                    <div className="user-data-cart">
                        <i className="bi bi-cart4" onClick={()=> changeisAnimating("showcart")}></i>
                        <p className='cart-number'>{data?.cart && data.cart.length} </p>
                    </div>

                    <p onClick={()=> changeisAnimating("showprofile")}>{session?.user?.name?.split(" ")[0]}</p>
                    
                    <div className="user-data-img" onClick={()=> changeisAnimating("showprofile")}>
                        <img src="/images/others/Mii.png" alt="Gata" />
                    </div>
                </div>
                :
                <button className="right-side" onClick={()=> {
                    changeisAnimating("showlogin")
                }}>
                    Ingresar
                </button>
            }
        </nav>
    )
}