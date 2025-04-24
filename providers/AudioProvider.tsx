'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { AudioContextType, AudioProps } from "@/types";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/stripLocale";


const AudioContext =  createContext<AudioContextType | undefined>(undefined);

const AudioProvider = ({children}:{children:React.ReactNode}) =>{
     const [audio, setAudio] = useState<AudioProps|undefined>()
     const pathname = usePathname();

     useEffect(() =>{
        const cleanLangPath = `${stripLocale(pathname)}`;
        if(cleanLangPath === "/create-podcast") setAudio(undefined);
     },[pathname])


     return (
        <AudioContext.Provider value={{audio, setAudio}}>
            {children}
        </AudioContext.Provider>
     )
}

export const useAudio = () =>{
    const context = useContext(AudioContext);

    if(!context) throw new Error('useAudio must be used within an AudioProvider');

    return context;
}


export default AudioProvider;