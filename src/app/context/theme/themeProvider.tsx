"use client";
import { ReactNode, useEffect, useState } from "react";
import { contextTheme } from "./themeContext";

interface childrenType{
    children: ReactNode;
}

export default function ThemeProv({children}: childrenType){

    //*Check the description below, that's why we safely start with "dark";
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const displayTheme = () =>{
        setTheme(x => x === "dark"? "light" : "dark");
    }

    useEffect(()=>{
        localStorage.setItem("theme", theme)
    }, [theme]);

    return (
        <contextTheme.Provider value={{theme, displayTheme}}>
            {children}
        </contextTheme.Provider>
    )
}