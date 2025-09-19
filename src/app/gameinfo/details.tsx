import './details.scss';
import ESRB from '../reusablecomponents/esrb/rate';
import ExtraInfo from '../reusablecomponents/extrainfo/extra';

export default function Details(){


    return (
        <section className='detailsk'>
            <div className="extrainfo">
                <ExtraInfo/>     
            </div>  

            <hr/>

            <div className="esrbc">
                <ESRB/>
            </div>
        </section>
    )
}