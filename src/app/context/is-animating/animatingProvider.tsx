import { ReactNode } from "react";
import { animatingContext, modalString } from "./animatingContext";
import { useState } from "react";


interface childrenType{
    children: ReactNode
}

export default function IsAnimatingProv({children}: childrenType){

    const [isAnimatingContext, setIsAnimating] = useState<modalString>(null);

    const changeisAnimating = (e: modalString) => {
        setIsAnimating(e);
    }


    return (
        <animatingContext.Provider value={{isAnimatingContext, changeisAnimating}}>
            {children}
        </animatingContext.Provider>
    )
}