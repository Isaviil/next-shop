'use client';
import useModalContext from "@/app/context/modal/modalContext";
import "./modallogout.scss";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default  function ModalLogOut(){

    const logoutRef = useRef<HTMLDivElement>(null)
    const {modal, displayModal} = useModalContext();

    useEffect(()=>{

        if (modal === "logout"){
           gsap.delayedCall(.3, ()=> {
             gsap.fromTo(logoutRef.current, {opacity: 0}, {opacity: 1, duration: .5, ease: "power2.out",
                onComplete: ()=>{
                    gsap.delayedCall(1, ()=> {
                        displayModal("hide");
                    })
                }
            })
           })
        }

    }, [modal])

    return (
        <div className="modal-logOut" ref={logoutRef}>
            <h2>Cerraste sesión correctamente</h2>
        </div>
    )
}