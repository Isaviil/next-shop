import { createContext } from "react"
import React from "react";


export type modalString = "login" | "logout" | "purchase" | "profile"| "cart" | "loginsuccess" | "hide" | "partialhide" | null;

interface contextType {
    modal: modalString,
    displayModal: (value: modalString)=> void;
}


export const modalContext = createContext<contextType | null>(null);

export default function useModalContext(){

    const context = React.useContext(modalContext);
    if (!context){
        throw new Error("No hay un contexto para usar")
    }
    return context;
}