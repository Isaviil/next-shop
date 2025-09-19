'use client';
import useModalContext from '@/app/context/modal/modalContext';
import './modalloginsuccess.scss';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ModalSuccess(){

    const sideModalToHide = useRef<HTMLDivElement>(null);
    const welcomeRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const msgRef = useRef<HTMLDivElement>(null);

    //*Getting the context
    const {modal, displayModal} = useModalContext();

    //*Getting the session
    const {data: session} = useSession()


    useEffect(()=>{

        if (modal === "loginsuccess" && sideModalToHide){
            const tl = gsap.timeline();
                tl.fromTo(welcomeRef.current, {opacity: 0}, {opacity: 1, duration: .5, ease: "power2.out"})
                .fromTo(nameRef.current, {opacity: 0}, {opacity: 1, duration: .5, ease: "power2.out"})
                .fromTo(msgRef.current, {opacity: 0}, {opacity: 1, duration: .5, ease: "power2.out", 
                    onComplete: ()=> {
                        gsap.delayedCall(1, ()=> displayModal("hide"));
                    }
            })
        }



    }, [modal])


    return (
        <div className="side-modal-showb" ref={sideModalToHide}>
            <p ref={welcomeRef}>Bienvenido</p>
            {session?.user && <h1 ref={nameRef}>{session.user?.name?.split(" ")[0]}</h1>}
            <p ref={msgRef}>Has iniciado sesión correctamente</p>
        </div>
    )
}