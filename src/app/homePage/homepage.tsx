'use client';
import './homepage.scss';
import Hotnow from "../reusablecomponents/hot/hotitems";
import Addons from '../reusablecomponents/dlc/addons';
import Details from '../gameinfo/details';
import WhatsNew from '../reusablecomponents/whatsnew/newest';
import Base from '../basegame/basegame';
import ExtraDescription from '../reusablecomponents/extraDescription/extraDescription';

export default function HomePage(){


    return (
        <main className="mainContainer">
            <section className="heroContainer">
                <img src="/images/strive/full/Strive.png" alt="" />
            </section>

            <section className="details">
               
               <div className='gameInfoRestriction'>
                
               </div>
                
                <Details/>
            </section>

            <Base/>            

            <section className="info">
                <WhatsNew/>
            </section>

            <ExtraDescription/>
            <Hotnow/>
            <Addons/>            
        </main>
    )

}