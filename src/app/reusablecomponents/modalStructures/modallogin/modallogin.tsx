import './modallogin.scss';
import ShowModal from '@/app/context/modal/modalContext';
import gsap from 'gsap';
import { signIn } from 'next-auth/react';
import { useRef, useState } from 'react';



export default function ModalLogin(){

    const sideModalToHide = useRef<HTMLDivElement>(null)

    //*ShowModal is the customhook, remember that
    const {modal, displayModal} = ShowModal();


    //*Const to prevent the user from closing on sending the info
    const isSubmitting = useRef(false);



    //*interface login
    interface loginType{
        email: string,
        pw: string
    }

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
        const formData = new FormData(e.target as HTMLFormElement);

        const x: loginType = {
            email: formData.get("email")?.toString()?? "",
            pw: formData.get("password")?.toString()?? ""
        }

        
        const result = await signIn("credentials", {
            redirect: false, //prevent automatic redirect
            email: x.email, 
            pw: x.pw 
        });


        if (result?.error === "NOT_FOUND"){
            isSubmitting.current = false;
            setError({user: "No se encontró el usuario", password: "La contraseña está vacía"});
        } 

        if (result?.error === "INVALID"){  
            setError({password: "Tu contraseña no es válida", user: null});
        }
        
        if (result?.ok){                         

            let tl = gsap.timeline()
                if (modal){
                    tl.fromTo(sideModalToHide.current, 
                    { opacity: 1}, 
                    { opacity: 0, duration: .9, ease: "power2.out",
                    onComplete:()=> {
                        isSubmitting.current = false;
                        displayModal("loginsuccess");
                    }})
                } 
        }

    }


    return (
       <div className="side-modal-showk" ref={sideModalToHide}>
                <div className="side-modal-showk-title">
                    <h2>Iniciar sesión</h2>
                </div>

                <form className="side-modal-showk-login" onSubmit={handleSubmit}>
                    <div className='user'>
                        <label htmlFor="email">Usuario</label>
                        <input id='email' name='email' type='text'></input>
                        {errorMSG && <p>{errorMSG.user}</p>}
                    </div>

                    <div className='password'>
                        <label htmlFor="password">Contraseña</label>
                        <input id="password" name='password' type='password'></input>
                        {errorMSG && <p>{errorMSG.password}</p>}                                
                    </div>

                    <div className='logIn-btn'>
                        
                        <button type='button' onClick={()=> !isSubmitting.current && displayModal("hide")}>Regresar</button>
                        <button type='submit' onClick={()=> isSubmitting.current = true}>Ingresar</button>                                
                    </div>   
                </form>

                <div className="side-modal-showk-reminder">
                    <p>*Usuario de prueba:</p>
                    <p>isavil.94s@gmail.com</p>
                    <p>1234</p>
                </div>
        </div>
    )    
}