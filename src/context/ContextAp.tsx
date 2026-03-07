import { createContext, useContext, useEffect, useState } from "react";
interface themecontextType{
    theme: string;
    toggleTheme: () => void;
}

const ContextAp = createContext<themecontextType | undefined>(undefined);

export function ContextApProvider({children}: {children: React.ReactNode}){

    const [theme, settheme] = useState(()=> localStorage.getItem('theme')|| 
    window.matchMedia("(prefers-color-scheme:dark)").matches?"dark" : "light")

    useEffect(() => {
     const root = window.document.documentElement;
     root.classList.remove('light','dark');
     root.classList.add(theme);
     localStorage.setItem('theme', theme);
    }, [theme])
    
    const toggleTheme =()=>{
        settheme((prev) => (prev === "light" ? "dark" : "light"))
    }

    return <ContextAp.Provider value={{theme, toggleTheme}}>
        {children}
    </ContextAp.Provider>
}; 

export function useTheme(){
    const context = useContext(ContextAp);
    if(context === undefined){
        throw new Error("useTheme must be used within a ContextApProvider");
    }
    return context;
}

