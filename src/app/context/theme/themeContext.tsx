import { createContext } from "react";
import React from "react";

interface typeContext{
    theme: string,
    displayTheme: ()=>void;
}

    export const contextTheme = createContext<typeContext | null>(null);

    export default function UseTheme(){
        const x = React.useContext(contextTheme);
        if (!x){
            throw new Error("No existe el contexto");
        }
        return x;
    }