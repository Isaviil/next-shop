'use client';
import Register from '@/app/register/register';
import './modallogin.scss';
import useModalContext from '@/app/context/modal/modalContext';
import gsap from 'gsap';
import { signIn } from 'next-auth/react';
//import Link from 'next/link';
import { useRef, useState } from 'react';



export default function ModalLogin(){

    const sideModalToHide = useRef<HTMLDivElement>(null)

    //*useModalContext is the customhook, remember that
    const {modal, displayModal} = useModalContext();
    const [registrar, setRegistrar] = useState(false);
    const [user, setUser] = useState('isavil.94s@gmail.com');
    const [password, setPassword] = useState('123');

    //*Const to prevent the user from closing on sending the info
    const isSubmitting = useRef(false);



    //*interface error
    interface errorType{
        user: string | null,
        password: string | null,
    }




    //*Retrieve the error with a state
    const [errorMSG, setError] = useState<errorType>({user: null, password: null});




    //*Sending the data to NextAuth to log in
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const result = await signIn("credentials", {
            redirect: false,
            email: user,
            pw: password,
        });

        if (result?.error === "NOT_FOUND") {
            isSubmitting.current = false;
            setError({
                user: "No se encontró el usuario",
                password: "La contraseña está vacía",
            });
        }

        if (result?.error === "INVALID") {
            isSubmitting.current = false;
            setError({
                password: "Tu contraseña no es válida",
                user: null,
            });
        }

        if (result?.ok) {
            const tl = gsap.timeline();

            if (modal) {
                tl.fromTo(
                    sideModalToHide.current,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        duration: 0.9,
                        ease: "power2.out",
                        onComplete: () => {
                            isSubmitting.current = false;
                            displayModal("loginsuccess");
                        },
                    }
                );
            }
        }
    }


    return (
       <div className="side-modal-showk" ref={sideModalToHide}>    

                {
                    registrar && <Register changeState = {setRegistrar}/>
                }                

                <div className="side-modal-showk-title">
                    <h2>Iniciar sesión</h2>
                </div>

                <form className="side-modal-showk-login" onSubmit={handleSubmit}>
                    <div className='user'>
                        <label htmlFor="email">Usuario</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={user}
                           
                            onChange={(e) => setUser(e.target.value)}
                        />
                        {errorMSG && <p>{errorMSG.user}</p>}
                    </div>

                    <div className='password'>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                  
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMSG && <p>{errorMSG.password}</p>}
                    </div>

                    <div className='logIn-btn'>
                        
                        <button type='button' onClick={()=> !isSubmitting.current && displayModal("hide")}>Regresar</button>
                        <button type='submit' onClick={()=> isSubmitting.current = true}>Ingresar</button>                                
                    </div>   
                </form>

                <div className="side-modal-showk-reminder">
                    <p>No eres usuario? <button onClick={()=> {setRegistrar(true)}}>Registrate</button></p>
                </div>
        </div>
    )    
}