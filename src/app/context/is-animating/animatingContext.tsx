import { createContext } from "react"
import React from "react";

export type modalString = "showlogin" | "showlogout" | "showpurchase" | "showprofile"| "showcart" | "showloginsuccess" | null;

interface isAnimatingType{
    isAnimatingContext: modalString,
    changeisAnimating: (e:modalString)=> void
}


export const animatingContext = createContext<isAnimatingType | null>(null);

export default function IsAnimating(){

    const context = React.useContext(animatingContext);
    if (!context){
        throw new Error("No hay un contexto disponible");
    }
    return context;
}