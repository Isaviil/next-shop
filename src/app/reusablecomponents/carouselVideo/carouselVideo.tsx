'use client';
import { useEffect, useRef } from 'react';
import './carouselVideo.scss';
import gsap from 'gsap';


type CarouselType = {
    url: string,
    displayState: string,
    onClose: ()=> void
}

export default function CarouselVideo({url, displayState, onClose}: CarouselType){

    const carouselVideoRef = useRef<HTMLDivElement>(null);


    useEffect(()=>{

        const tl = gsap.timeline();
        if (carouselVideoRef.current){
            tl.fromTo(carouselVideoRef.current, {opacity: 0}, {opacity:1, ease: "power2.out"})
        }

    }, [])

    return (
        <div className='carousel-video' ref={carouselVideoRef}>
            <div className="carousel-video-element">
                <iframe 
                src={url} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                ></iframe>

                <i className="bi bi-x-lg" onClick={onClose}></i>
            </div>
        </div>
    )
}