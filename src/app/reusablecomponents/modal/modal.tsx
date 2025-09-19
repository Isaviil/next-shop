'use client';
import './modal.scss';
import { useEffect, useRef } from 'react';
import useModalContext from '@/app/context/modal/modalContext';
import ModalLogin from '../modalStructures/modallogin/modallogin';
import gsap from 'gsap';
import ModalSuccess from '../modalStructures/modalloginsuccess/modalloginsuccess';
import ModalPerfil from '../modalStructures/modalperfil/modalperfil';
import ModalLogOut from '../modalStructures/modallogout/modallogout';
import IsAnimating from '@/app/context/is-animating/animatingContext';
import ModalCarrito from '../modalStructures/modalcart/modalcart';


export default function Showthemodal(){

    //*useModalContext is the customhook, remember that
    const {modal, displayModal} = useModalContext();
    const {isAnimatingContext, changeisAnimating} = IsAnimating();
    
    const sideModal = useRef<HTMLDivElement>(null)
    const sideModalParent = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);
    


    //!DNT
    //*Cerrar el modal + background al hacer click en "x", "y" o "z".
    useEffect(()=>{
       if (modal === "hide" && modal){

        if (isAnimating.current){
            return;
        }

        isAnimating.current = true;

            let tl = gsap.timeline();
              
            tl.fromTo(sideModal.current, {xPercent: 0}, {xPercent: 100, duration: .4, ease: "power2.out"})
            .fromTo(sideModalParent.current, {opacity: 1}, {opacity: 0, duration: .4, ease: "power2.out", zIndex: -1, 
                onComplete: ()=> {
                    displayModal(null)
                    isAnimating.current = false;
                }
            }); 
       }
    }, [modal])



    //!DNT
    //*Solo cerrar el modal, mas no quitar el background
    useEffect(()=>{

        if (modal === "partialhide" && modal){
            if (isAnimating.current){
                return;
            }

            isAnimating.current = true; 

            //*0 a 100 - close
            gsap.fromTo(sideModal.current, {xPercent: 0}, {xPercent: 100, duration: .4, ease: "power2.out",
                onComplete: ()=> {
                    changeisAnimating("showcart");
                    isAnimating.current = false;
                }
            }); 
        }

    }, [modal]);




    //*Blur the background and show the modal feom 0 to 1.
    useEffect(()=>{

        if (!isAnimatingContext) return;        

        let tl = gsap.timeline();

        if (modal === "partialhide"){
            //de 0 a 100 se oculta

                if (isAnimatingContext === "showcart"){            
                    displayModal("cart");  
                    changeisAnimating(null)  
                    return;
                }   

            
        } else {
            tl.set(sideModalParent.current, {zIndex: 10})
            tl.fromTo(sideModalParent.current, {opacity: 0}, {opacity: 1, duration: .5, ease: "power3.out", onComplete: ()=> changeisAnimating(null)})
        }

        if (isAnimatingContext === "showcart"){            
            displayModal("cart");   
        }

        if (isAnimatingContext === "showprofile"){
            displayModal("profile")
        }

        if (isAnimatingContext === "showlogin"){            
            displayModal("login");      
        }

    }, [isAnimatingContext])





    //!DNT
    //*Showing the modal + blurring the background  on login
    useEffect(()=>{    
        

        //*Lock the screen if the modal is active
        if (modal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        let tl = gsap.timeline();

        if (modal === "login"){

        if (isAnimating.current){
            return;
        }

        isAnimating.current = true;
            tl.set(sideModalParent.current, {zIndex: 10})
            tl.fromTo(sideModalParent.current, {opacity: 0}, {opacity: 1, duration: .5, ease: "power3.out"})
            .fromTo(sideModal.current, {xPercent: 100}, {xPercent: 0, duration: .3, ease: "power2.out", onComplete: ()=> {isAnimating.current = false}}, '<+=.4')        
        };

    }, [modal])






    //*Showing the cart modal when we need the "carrito"
    useEffect(()=>{

        let tl = gsap.timeline();

        if (modal === "cart"){

        if (isAnimating.current){
            return;
        }

        isAnimating.current = true;

            //tl.fromTo(sideModal.current, {opacity: 0}, {opacity: 1, duration: .5, ease: "power3.out"})
            tl.fromTo(sideModal.current, {xPercent: 100}, {xPercent: 0, duration: .7, ease: "power2.out", onComplete: ()=> {isAnimating.current = false}}, .3)      

        };

    }, [modal])









    //*Toggle the modal when clicking on the profile

    useEffect(()=>{

        if (modal === "profile"){

            let tl = gsap.timeline();

            if (isAnimating.current){
            return;
        }

        isAnimating.current = true;

            tl.fromTo(sideModalParent.current, {opacity: 0}, {opacity: 1, duration: .5, ease: "power3.out"})
            .fromTo(sideModal.current, {xPercent: 100}, {xPercent: 0, duration: .3, ease: "power2.out", onComplete: ()=> {isAnimating.current = false}})        
        };

    }, [modal])




    
    

    return (
 
        <div className='side-modal-parent' ref={sideModalParent}>
            {modal && (
                <div className="side-modal" ref={sideModal}>
                {modal === "login" && (<ModalLogin/>)}
                {modal === "loginsuccess" && (<ModalSuccess/>)}
                {modal === "profile" && (<ModalPerfil/>)}
                {modal === "logout" && (<ModalLogOut/>)}
                {modal === "cart" && (<ModalCarrito/>)}
                </div>
            )}
        </div>
 
    )
}