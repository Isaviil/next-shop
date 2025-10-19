'use client';
import './orders.scss';
import { useQuery } from '@tanstack/react-query';
import SteelBallRun01 from '../reusablecomponents/steelball01/ball01';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import jsPDF from "jspdf";


    type queryType = {
        cart: {
            id: number,
            userid: number,
            productid: number,
            orderdate: string,
            products: {
                id: number,
                name: string,
                shortdescription: string,
                longdescription: string,
                price: string,
                imageurl: string,
                category: string
            };
        }[]
    }

    

export default function Orders(){


    const ordersRef = useRef<HTMLDivElement>(null);


    const {data, isLoading} = useQuery<queryType>({
        queryKey: ["orders"],
        queryFn: async ()=> {
            const res = await fetch("/api/orders", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        refetchOnWindowFocus: false
    });


    //pdf
    function handleDownload() {
    if (!data?.cart?.length) return;

    const doc = new jsPDF();

    // === HEADER ===
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Strive", 105, 15, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`ID de usuario: ${data.cart[0].userid || "Invitado"}`, 14, 25);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 14, 32);

    // Divider
    doc.setLineWidth(0.5);
    doc.line(10, 36, 200, 36);

    // === LISTADO DE COMPRAS ===
    let y = 45;
    const lineHeight = 10;
    let total = 0;

    data.cart.forEach((x, i) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${i + 1}. ${x.products.name}`, 14, y);

        doc.setFont("helvetica", "normal");
        doc.text(`${x.products.shortdescription}`, 14, y + 5);
        doc.text(`${x.products.price}G`, 190, y, { align: "right" });

        y += lineHeight * 2; // space between rows
        total += Number(x.products.price) || 0;
    });

    // Divider
    doc.line(10, y - 5, 200, y - 5);

    // === TOTAL ===
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${total}G`, 14, y + 5);

    // === FOOTER ===
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Gracias por su compra", 105, 290, { align: "center" });

    // Save
    doc.save("Compras_Strive.pdf");
    }


    useEffect(()=>{

        if (data){
            gsap.fromTo(ordersRef.current, {opacity: 0}, {opacity: 1, duration: 2, ease: "power2.out"})
        }

    }, [data])



    return(
        <div className="orders">
            <SteelBallRun01/>
            
            {isLoading && <h2>Cargando...</h2>}
            {data && 
            <>
                <div className="orders-buttons">
                    <button onClick={handleDownload}>Descargar PDF</button>
                </div>
                <h1>Mis compras</h1>       
                <div className="orders-container" ref={ordersRef}>                     
                    
                    <div className="orders-container-data">
                        
                        {data?.cart?.map(x => (
                        <div className="orders-container-data-row" key={x.id}>                    
                            <div className="orders-container-data-row-img">
                                <img src={x.products.imageurl} alt="" />
                            </div>

                            <div className="orders-container-data-row-text">
                                <p>Id de compra: {x.id}</p>
                                <p>{x.products.name}</p>
                                <p>{x.products.shortdescription}</p>
                                <p>{new Date(x.orderdate).toLocaleString()}</p>
                                <p>{x.products.price}G</p>
                            </div>
                        </div>
                        ))}
                    </div>    


                </div>
            </>
            }
            
        </div>
    )
}

