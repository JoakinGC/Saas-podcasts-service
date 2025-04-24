"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

const ThemeLightOrDarkProvider = ({children} :{children:ReactNode}) =>{

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={['light','dark']}
        >
            {children}
        </ThemeProvider>
    
  );
}



export default ThemeLightOrDarkProvider;