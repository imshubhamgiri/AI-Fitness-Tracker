import { getMotivationalMessage } from "../assets/FitTrack_Assets/assets/assets";
import { useAppContext } from "../context/AppContext"
import { useState , useEffect} from "react";
import type { ActivityEntry, FoodEntry } from "../types";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import { ActivityIcon, FlameIcon, Hamburger, ZapIcon } from "lucide-react";


const Dashboard = () => {
  const {user ,allActivityLogs, allFoodLogs} = useAppContext();
  const [todayFood, setTodayFood] = useState<FoodEntry[]>([]);
  const [todayActivity, setTodayActivity] = useState<ActivityEntry[]>([]);
  const DAILY_CALORIE_LIMIT: number = user?.dailyCalorieIntake || 2000;
  
    const loadUserData = () => {
      const today = new Date().toISOString().split('T')[0];
      const userFoodLogs = allFoodLogs.filter((f:FoodEntry) => f.createdAt?.split('T')[0]  === today);
      const Activitydata = allActivityLogs.filter((f:ActivityEntry) => f.createdAt?.split('T')[0]  === today);
      setTodayFood(userFoodLogs)
      setTodayActivity(Activitydata);
    }
   useEffect(() => {
    (()=>{loadUserData()})()
   }, [allActivityLogs, allFoodLogs])
   
   const totalCalories : number = todayFood.reduce((sum, entry) => sum + entry.calories, 0);
   const TotalActiveminutes : number = todayActivity.reduce((sum, entry) => sum + entry.duration, 0);
    const caloriesBurned : number = todayActivity.reduce((sum, entry) => sum + (entry.calories || 0), 0);
   const netCalories : number = totalCalories - caloriesBurned;
   const remainingCalories : number = DAILY_CALORIE_LIMIT - totalCalories;
  const motivation = getMotivationalMessage(totalCalories, TotalActiveminutes,DAILY_CALORIE_LIMIT);
  return (
    <div className="page-container">
    {/* Header */}
    <div className="dashboard-header">
    <p className="text-emerald-100 text-sm font-medium">
      Welcome Back
    </p>
    <h1 className="text-2xl mt-1 font-bold">
      {"Hi there!👋, " + (user?.username || 'User') + '!' }
    </h1>
      <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{motivation.emoji}</span>
          <p className="text-white font-medium">{motivation.text}</p>
        </div>
      </div>
    </div>
    {/* Stats */}
    <div className="dashboard-grid">
    {/* Calories Consumed */}
    <Card className="shadow-lg col-span-2">
      <div className="flex items-center mb-4  justify-between">
      <div className="text-left flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
           <Hamburger className="w-6 h-6 text-orange-400"/> </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Calories Consumed</p>
        <p className="text-2xl text-slate-800 dark:text-white font-bold">{totalCalories}</p>
      </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-slate-500 dark:text-slate-400">Limit</p>
        <p className="text-2xl text-slate-800 dark:text-white font-bold">
          {DAILY_CALORIE_LIMIT} kcal</p>
      </div>
      </div>
      <ProgressBar value={totalCalories} max={DAILY_CALORIE_LIMIT} />
      <div className="flex mt-4 justify-between items-center">
        <div className={`px-3 py-1.5 rounded-xl text-sm font-medium 
          ${remainingCalories > 0 ? 'bg-green-100 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400' 
          : 'bg-red-100 text-red-800 dark:text-red-400 dark:bg-red-900/10'}`}>
        <span className="text-sm font-medium">
         {remainingCalories > 0 ? `${remainingCalories} kcal remaining` : `${Math.abs(remainingCalories)} kcal over}`}</span>
        </div>
        <span>{Math.round((totalCalories/DAILY_CALORIE_LIMIT) * 100)}%</span>
      </div>
      <div className="border-t border-slate-100 my-4 dark:border-slate-700" ></div>



      <div className="flex items-center mb-4  justify-between">
      <div className="text-left flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
           <FlameIcon className="w-6 h-6 text-orange-400"/> </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Calories burned</p>
        <p className="text-2xl text-slate-800 dark:text-white font-bold">{caloriesBurned}</p>
      </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-slate-500 dark:text-slate-400">Goal</p>
        <p className="text-2xl text-slate-800 dark:text-white font-bold">
          {user?.dailyCalorieBurn || 400} kcal</p>
      </div>
      </div>
      <ProgressBar value={caloriesBurned} max={user?.dailyCalorieBurn || 400}  />
    </Card>
    {/* Calories Burned */}
    <div className= "dashboard-card-grid">
            {/* {active mins} */}
      <Card className="shadow-lg">
            <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <ActivityIcon className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Active </p>
            </div>
            <p className="text-2xl fond-bold text-slate-800 dark:text-white font-bold">{TotalActiveminutes} mins</p>
            <p className="text-sm text-slate-400">Minutes Today</p>
        </Card>
        <Card className="shadow-lg">
            <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <ZapIcon className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Workouts </p>
            </div>
            <p className="text-2xl fond-bold text-slate-800 dark:text-white font-bold">{todayActivity.length} </p>
            <p className="text-sm text-slate-400">Activities Logged</p>
        </Card>
    </div>

  
  
    </div>
    </div>
  )
}

export default Dashboard
