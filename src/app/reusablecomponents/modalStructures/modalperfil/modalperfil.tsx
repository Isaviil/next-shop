'use client';
import { useSession } from 'next-auth/react';
import './modalperfil.scss';
import ShowModal from '@/app/context/modal/modalContext';
import { signOut } from "next-auth/react";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import IsAnimating from '@/app/context/is-animating/animatingContext';
import { useRouter } from 'next/navigation';
import { QueryKey, useQueryClient } from '@tanstack/react-query';


export default function ModalPerfil(){

    const router = useRouter();

    const queryClient = useQueryClient();

    //*Retrieve the session and context
    const {data: session} = useSession();
    const {modal, displayModal} = ShowModal();
    const {isAnimatingContext, changeisAnimating} = IsAnimating();

    //*Ref
    const perfilRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);


    return (
        <div className="modal-perfil" ref={perfilRef}>
            <div className="modal-perfil-usuario">
                <div className="modal-perfil-usuario-img">
                    <img src="/images/others/Mii.png" alt="" />
                </div>

                <div className="modal-perfil-usuario-text">
                    {session && (<h2>{session?.user?.name?.split(" ")[0]}</h2>)}
                    {session && (<p>{session?.user?.email}</p>)}
                </div>
            </div>

            <div className="modal-perfil-options">
                <button onClick={()=> 
                    {
                    displayModal("hide");
                    router.push("/purchases")
                    }}> Mis compras </button>
                
                <button onClick={()=> {
                    if (isAnimating.current) return;
                    isAnimating.current = true;

                    gsap.fromTo(perfilRef.current, {opacity: 1}, {opacity: 0, duration: .8, ease: "power2.out", onComplete: ()=>{
                        displayModal("partialhide");
                    }})
                }}> 
                    Mi carrito 
                </button>
                <button onClick={()=> {
                    if (isAnimating.current) return;
                    isAnimating.current = true;

                    gsap.fromTo(perfilRef.current, {opacity: 1}, {opacity: 0, duration: .7, ease: "power2.out", onComplete: ()=>{
                        displayModal("hide");
                    }})
                }}> 
                    Regresar 
                </button>
                <button onClick={()=> {

                    if (isAnimating.current) return;
                    isAnimating.current = true;
                    

                    gsap.fromTo(perfilRef.current, {opacity: 1}, {opacity: 0, duration: .7, ease: "power2.out", 
                        onComplete: ()=> {
                            displayModal("logout");
                            isAnimating.current = false;
                            queryClient.removeQueries({ queryKey: ["cart"] });
                            queryClient.removeQueries({ queryKey: ["orders"] });
                            signOut({redirect: false});                           
                        }                         
                    })                    
                                      
                }}> Cerrar sesión </button>
            </div>
        </div>
    )
}