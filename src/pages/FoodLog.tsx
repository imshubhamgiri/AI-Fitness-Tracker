import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext"
import type { FoodEntry, FormData } from "../types";
import Card from "../components/ui/Card";
import { quickActivitiesFoodLog } from "../assets/FitTrack_Assets/assets/assets";


const FoodLog = () => {
  const {allFoodLogs ,setAllFoodLogs} = useAppContext();
  const [entries , setEntries] = useState<FoodEntry[]>([]);
  const [showForm , setShowForm] = useState(false);
  const[loading , setLoading] = useState(false);

  const [formData , setFormData] = useState<FormData>({
    name: "",
    calories: 0,
    mealType: "",
  });
  
  const handleQuickAdd = (activityname : string)=>{
 setFormData({...formData , mealType: activityname})
 setShowForm(true);
  }

  const Today = new Date().toISOString().split('T')[0];
  const LoadEntries = ()=>{
    const todayEntries = allFoodLogs.filter((log: FoodEntry )=> log.createdAt?.split('T')[0] === Today);
    setEntries(todayEntries);
  }
  const TotalCalorie = entries.reduce((total, entry) => total + entry.calories, 0);
 useEffect(()=>{
  (()=>{
 LoadEntries();
  })();
 },[allFoodLogs])
  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
           <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Food Log</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Track your daily food intake</p>
           </div>
           <div  className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Today's Total</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {TotalCalorie} Kcal </p>
           </div>
        </div>
      </div>


      <div className="page-content-grid">
        {/* Quick Add section */}
       {!showForm && (
        <div className="space-y-4">
          <Card>
            <h3 className="mb-3 font-semibold text-slate-700 dark:text-slate-200">Quick Add</h3>
            <div className="flex flex-wrap gap-2">
              {quickActivitiesFoodLog.map((activities)=>(
                <button key={activities.name} onClick={()=>handleQuickAdd(activities.name)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700
                rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors ">
                  {activities.emoji} {activities.name}
                </button>
              ))}
            </div>
          </Card>
        </div>
       )}
      </div>
    </div>
  )
}

export default FoodLog
