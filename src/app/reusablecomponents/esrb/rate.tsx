import './rate.scss';

export default function ESRB(){

    return (
        <div className="esrb">
                <div className="esrb-img">
                    <img src="/images/icons/esrb.png" alt="" />
                </div>

                <div className="esrb-text">
                    <p>*Sangre, lenguaje, temas sugestivos, violencia</p>
                    <p>*Compras in-game, interacción con usuarios.</p>
                </div>
        </div>
    );
}