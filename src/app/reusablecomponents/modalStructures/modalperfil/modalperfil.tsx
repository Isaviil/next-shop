'use client';
import { useSession } from 'next-auth/react';
import './modalperfil.scss';
import useModalContext from '@/app/context/modal/modalContext';
import { signOut } from "next-auth/react";
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Register from '@/app/register/register';


export default function ModalPerfil(){

    const router = useRouter();

    const queryClient = useQueryClient();

    //*Retrieve the session and context
    const {data: session} = useSession();
    const {modal, displayModal} = useModalContext();
    const [isEdit, setIsEdit] = useState<boolean>(false)
    //const {isAnimatingContext, changeisAnimating} = IsAnimating();

    //*Ref
    const perfilRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);

    //*
    const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
        const res = await fetch("/api/usuarios");
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
        }
    });

    return (
        <div className="modal-perfil" ref={perfilRef}>

                {
                    isEdit && <Register changeState = {setIsEdit} isEdit={isEdit}/>
                }   
            
            <div className="modal-perfil-usuario">
                <div className="modal-perfil-usuario-img">
                    <img src="/images/others/Mii.png" alt="" />
                </div>

                <div className="modal-perfil-usuario-text">
                    {session && (<h2>{user?.name?.split(" ")[0]}</h2>)}
                    {session && (<p>{user?.email}</p>)}
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

                {/* <button disabled onClick={()=> {
                    setIsEdit(true);
                }}>
                    Editar
                </button>
 */}
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