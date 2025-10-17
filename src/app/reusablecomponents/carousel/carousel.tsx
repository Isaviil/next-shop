'use client';
import { useEffect, useState, useRef } from 'react';
import './carousel.scss';
import gsap from 'gsap';
import CarouselVideo from '../carouselVideo/carouselVideo';


export default function Carousel(){

    //refs
    const carouselRef = useRef<HTMLDivElement>(null);
    const arrowLeft = useRef<HTMLElement>(null);
    const arrowRight = useRef<HTMLElement>(null);



    //child container's width & counter
    const containerLongitud = useRef(0);
    const currentIndex = useRef(0);


    //state to trigger the modal
    type displayVideoType = {
        url: string,
        showVideo: string
    }

    const [displayVideo, setDisplayVideo] = useState<displayVideoType>({url: "", showVideo: "notShow"});




    const arrayCarousel = [
        {
            thumbnail: "/images/strive/thumbnails/GGSTThumbnailTwo.png",
            url: "https://www.youtube.com/embed/Yhr9WpjaDzw"
        },
        {
            thumbnail: "/images/strive/thumbnails/BedmanThumbnailTwo.png",
            url: "https://www.youtube.com/embed/79fZGkcI4Yc"
        },
        {
            thumbnail: "/images/strive/thumbnails/QueenDizzyThumbnailTwo.png",
            url: "https://www.youtube.com/embed/nXDsAgYXXv4"
        },
        {

            thumbnail: "/images/strive/thumbnails/AbaThumbnailTwo.png",
            url: "https://www.youtube.com/embed/ZjqfSOnuyyM"
        },
        {
            thumbnail: "/images/strive/thumbnails/BridgetThumbnailTwo.png",
            url: "https://www.youtube.com/embed/eMlf83j7WD8"
        }
    ]


    useEffect(()=>{

    if (!carouselRef.current) return;

    const children = carouselRef.current?.children;
   
    if (children.length>0){
        const first = children[0]?.cloneNode(true);
        const second = children[1]?.cloneNode(true);
        const last = children[children.length - 1]?.cloneNode(true);
        const secondLast = children[children.length - 2]?.cloneNode(true);

        if (first) carouselRef.current?.append(first);
        if (second) carouselRef.current?.append(second);
        if (last) carouselRef.current?.prepend(last);
        if (secondLast) carouselRef.current?.prepend(secondLast);
    }  
    
    const updateScrollWidth = () => {
        const elements = gsap.utils.toArray<HTMLElement>(".carousel-container-element");
        if (elements.length > 0) {
        containerLongitud.current = elements[0].scrollWidth;
        }
    };    
    
    updateScrollWidth();
        
    window.addEventListener("resize", updateScrollWidth)

    return ()=> window.removeEventListener("resize", updateScrollWidth)

    }, [])

    

    //avoid spam
    const isAnimating = useRef(false);


    //moving left
    const toLeft = () => {

        if (isAnimating.current) return;
        isAnimating.current = true

        currentIndex.current--;
        gsap.to(carouselRef.current, {x: -(containerLongitud.current+10)*currentIndex.current,
            onComplete: ()=>{
                isAnimating.current = false;
                if (currentIndex.current === -3){
                    currentIndex.current = 2;
                    gsap.set(carouselRef.current, {x: -(containerLongitud.current+10)*currentIndex.current })
                }
            }
        })        
    }

    //moving right
    const toRight = () => {
        console.log(containerLongitud.current);
        if (isAnimating.current) return;
        isAnimating.current = true

        currentIndex.current++;
        gsap.to(carouselRef.current, {x: -(containerLongitud.current+10)*currentIndex.current,
            onComplete: ()=>{   
                isAnimating.current = false;             
                if (currentIndex.current === arrayCarousel.length - 2){
                    currentIndex.current = -2;
                    gsap.set(carouselRef.current, {x: -(containerLongitud.current+10)*currentIndex.current })
                }
            }
        })
        
    }


    return (
        <>
            <section className='carousel'>

                <h2>Trailers</h2>

                <div className='carousel-container' ref={carouselRef}>
                    {
                        arrayCarousel.map((x, i)=> (
                            <div className="carousel-container-element" key={i} onClick={()=> {
                                    setDisplayVideo({url: x.url, showVideo: "show"})
                                }}>
                                <img src={x.thumbnail} />

                                <div className="carousel-container-element-overlay">

                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className="carousel-arrows">
                    <i className="bi bi-chevron-left" ref={arrowLeft} onClick={toLeft}></i>
                    <i className="bi bi-chevron-right" ref={arrowRight} onClick={toRight}></i>
                </div>            
            </section>

            {displayVideo.showVideo === "show" && <CarouselVideo url={displayVideo.url} displayState={displayVideo.showVideo} onClose={()=> setDisplayVideo({url: "", showVideo: "notShow"})}/>}
        </>
    )
}