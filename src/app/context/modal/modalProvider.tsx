import { ReactNode, useState } from "react";
import { modalContext } from "./modalContext";
import { modalString } from "./modalContext";

interface childrenType{
    children: ReactNode;
}

export default function ModalProvider({children}: childrenType){


    const [modal, setModal] = useState<modalString | null>(null);

    const displayModal = (e: modalString ) => {
        setModal(e);
    }

    return(

        <modalContext.Provider value={{modal, displayModal}}>
            {children}
        </modalContext.Provider>

    )
}