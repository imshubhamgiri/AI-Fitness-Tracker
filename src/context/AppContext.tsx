import {   createContext, useContext,  useEffect,  useState } from "react";
import {type ActivityEntry,type FoodEntry, initialState, type Credentials, type User } from "../types";
import { useNavigate } from "react-router-dom";
import mockApi from "../assets/FitTrack_Assets/assets/mockApi";


const AppContext = createContext(initialState);



export const AppProvider = ({children}: {children: React.ReactNode}) =>{
    const Navigate = useNavigate();
    const [user, setUser] = useState<User|null>(null);
    const [isUserFetched, setIsUserFetched] = useState<boolean>(false);
    const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
    const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([]);
    const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([]);

    const signup = async(credentials:Credentials ) =>{
       const {data} = await mockApi.auth.register(credentials);
         setUser(data.user);
         if(data?.user.age && data?.user.weight && data?.user.goal){
            setOnboardingCompleted(true);
        }
        localStorage.setItem('token', data.jwt);
    }
    
    const login = async(credentials:Credentials) =>{
        const {data} = await mockApi.auth.login(credentials);
        setUser({...data.user, token:data.jwt});
        if(data?.user.age && data?.user.weight && data?.user.goal){
            setOnboardingCompleted(true);
        }
        localStorage.setItem('token', data.jwt);
    }
    
    const logout = () =>{
        localStorage.removeItem('token');
        setUser(null);
        setOnboardingCompleted(false);
        Navigate('/');
    }

    const fetchUser = async(token:string) =>{
        try {
            const {data} = await mockApi.user.me();
            setUser({...data, token});
            if(data?.age && data?.weight && data?.goal){
                setOnboardingCompleted(true);
            }
            
        } catch (error) {
            console.error("Error fetching user:", error);
                localStorage.removeItem('token');
        } finally {
            setIsUserFetched(true);
        }
    }

    const fetchFoodLogs = async() =>{
        const {data} = await mockApi.foodLogs.list();
        setAllFoodLogs(data);
    }

    const fetchActivityLogs = async() =>{
        const {data} = await mockApi.activityLogs.list();
        setAllActivityLogs(data);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            (async()=>{
           await fetchUser(token);
           await fetchFoodLogs();
            await fetchActivityLogs();
            })();
        }else{
            setIsUserFetched(true);
        }
        
    },[])

    const value = {
        user, setUser, login, signup, fetchUser, isUserFetched, logout, onboardingCompleted, setOnboardingCompleted,
         allFoodLogs, setAllFoodLogs, allActivityLogs, setAllActivityLogs,

     }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);