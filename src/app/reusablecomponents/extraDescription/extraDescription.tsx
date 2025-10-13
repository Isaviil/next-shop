'use client';
import './extraDescription.scss';

export default function ExtraDescription(){
    return (
        <section className="extraDesc">
            <video src="/images/strive/StriveUnikaClip.mp4" muted autoPlay loop></video>

            <div className="extraDesc-text">
                <h4>Resumen</h4>
                <h3>ADÉNTRATE EN UN MUNDO DE ROCK Y ACCIÓN</h3>

                <div className="extraDesc-text-p">
                    <p>Desde los escenarios atronadores de Nueva York y los cielos ardientes de Illyria, hasta el caos infinito del Backyard, Guilty Gear -Strive- da vida a un impresionante choque de música, estilo y rebelión.</p>

                    <p>Sumérgete en arenas 2.5D visualmente deslumbrantes, impulsadas por arte anime dibujado a mano y efectos de nueva generación, donde cada golpe se siente cinematográfico y cada personaje irradia personalidad.</p>

                    <p>Desafía rivales de todo el mundo, domina estilos de combate únicos y forja tu leyenda en la prueba definitiva de habilidad y determinación.</p>

                    <p>Haz temblar el campo de batalla. Rompe tus límites. Conviértete en el gear que desafía al destino.</p>
                </div>
            </div>
        </section>
    )
}