'use client';
import './extra.scss';

export default function ExtraInfo(){

    type details = {
        text: string;
        icon: string;
    }[]

    //mapping the array of detailsR objects
    const detailsR: details = [
        {
            text: "Se requiere internet para jugar online.",
            icon: "/images/icons/online.png",
        },
        {
            text: "El juego online es opcional.",
            icon: "/images/icons/steam.png",
        },
        {
            text: "Se requiere de 1 a 2 jugadores.",
            icon: "/images/icons/controller.png",
        },
        {
            text: "Es necesario un mando para la vibración.",
            icon: "/images/icons/vibrate.png",
        }

    ]

    return(

            <div className="extra-details">                   
            {
                detailsR.map((x, i)=> (
                    <div className="details-container" key={i}>
                        <div className="details-container-icon">
                            <img src={x.icon} alt="" />
                        </div>

                        <div className="details-container-text">
                            <p>{x.text}</p>
                        </div>
                    </div>
                ))
            }
            </div>            

    );
}