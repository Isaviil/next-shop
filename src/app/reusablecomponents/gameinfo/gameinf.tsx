'use client';
import './gameinf.scss';
import { useSession } from 'next-auth/react';
import ShowModal from '@/app/context/modal/modalContext';
import { useQueryClient } from '@tanstack/react-query';
import CartButton from '../button-addcart/cartbutton';


interface GameInfoProps {
        products: {
            id: number;
            name: string;
            shortdescription: string;
            longdescription: string;
            price: string; 
            imageurl: string;
            ishot?: boolean;
        };
    }


export default function GameInfo({products} : GameInfoProps){

    //*Retrieving the session to play a little bit with it
    const {data: session} = useSession();

    //*Retrieving the modal state
    const {modal, displayModal} = ShowModal();
    

    return (
         <div className="game-info">
            <div className="title">
                <h1>{products.name}</h1>
            </div>

            <div className="arc">
                <h2>ARC SYSTEM WORKS</h2>
            </div>

            <div className="platforms">
                <p>PS4</p>
                <p>PS5</p>
                <p>Steam</p>
                <p>Xbox</p>
            </div>

            <div className="price">
                <p>{products.price} G</p>
            </div>

            <CartButton productId={products.id}/>
        </div>
    );
}