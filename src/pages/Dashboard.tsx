import { getMotivationalMessage } from "../assets/FitTrack_Assets/assets/assets";
import { useAppContext } from "../context/AppContext"
import { useState , useEffect} from "react";
import type { ActivityEntry, FoodEntry } from "../types";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import { ActivityIcon, Car, FlameIcon, Hamburger, RulerIcon, ScaleIcon, TrendingUp, ZapIcon } from "lucide-react";
import CaloriesChart from "../assets/FitTrack_Assets/assets/CaloriesChart";


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
    {/* Stats */}
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

   {/* {goal card} */}
      {user && (
        <Card className="bg-linear-to-r from-slate-800 to-slate-700  ">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6  h-6  text-emerald-400"/>
            </div>
            <div className="">
              <p className="text-sm  text-slate-400">Your Goal</p>
              <p className="font-semibold capitalize text-white">
                {user.goal === 'lose' && '🔥 Lose Weight'}
                {user.goal === 'maintain' && '✅ Maintain Weight'}
                {user.goal === 'gain' && '💪 Gain Muscle'}
              </p>
            </div>
          </div>
        </Card>
      )}
      {/* {Body metrics card} */}
      {user && user.weight &&(
        <Card>
          <div className="flex items-center gap-4 mb-6">
       <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <ScaleIcon className="w-6  h-6  text-indigo-500"/>
            </div>
            <div>
              <h3 className="font-semibold  text-slate-800 dark:text-white"> Body Metrics</h3>
              <p className="text-sm  text-slate-400">Your Stats</p>
            </div>

          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <ScaleIcon className="w-5 h-5 text-slate-500" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">Weight</span>
              </div>
             <span className="font-semibold text-slate-700 dark:text-white">{user.weight} kg</span>
            </div>
            {user.height && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <RulerIcon className="w-5 h-5 text-slate-500" />
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Height</span>
                </div>
                <span className="font-semibold text-slate-700 dark:text-white">{user.height} cm</span>
              </div>
            )}
            {user.height && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-400">
                      BMI
                      </span>

                      {(()=>{
                        const bmi = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);
                        const bmiStatus = (b:number)=>{
                          if (b < 18.5) return {color:'text-blue-500', bg:'bg-blue-100'};
                          if (b < 25) return {
                            color:'text-emerald-500',
                             bg:'bg-emerald-500'
                          };
                          if (b < 30) return {
                            color:'text-orange-500',
                             bg:'bg-orange-500'
                          };
                          return {
                            color:'text-red-500',
                            bg: 'bg-red-500'
                          };
                        };
                        const status = bmiStatus(parseFloat(bmi));
                        return (
                          <span className={`text-lg font-bold ${status.color} `}>
                            {bmi}
                          </span>
                        )
                      })()}
                 </div>
                 {/* BMi scale visual */}
                 <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden
                 flex ">
                   {/* <div
                     className={`h-full rounded-full ${
                       parseFloat(bmi) < 18.5
                         ? 'bg-blue-500'
                         : parseFloat(bmi) < 25
                         ? 'bg-emerald-500'
                         : parseFloat(bmi) < 30
                         ? 'bg-orange-500'
                         : 'bg-red-500'
                     }`}
                     style={{ width: `${Math.min(100, (parseFloat() / 40) * 100)}%` }}
                   ></div> */}
                   <div className="flex-1 bg-blue-400 opacity-30"></div>
                   <div className="flex-1 bg-emerald-400 opacity-30"></div>
                   <div className="flex-1 bg-orange-400 opacity-30"></div>
                   <div className="flex-1 bg-red-400 opacity-30"></div>
              
                 </div>
                 <div className="flex justify-between mt-1 text-[-10px] text-slate-400">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                 </div>
              </div>
            )}
          </div>
          </Card>
      )}
      {/* Quick summary */}
      <Card>
        <h3 className="font-semibold  text-slate-700 dark:text-white mb-4">
        Today's Summary
        </h3>

        <div className="space-y-3">
          <div className="flex items-center py-2 border-b border-slate-100 dark:border-slate-800 justify-between">
            <span className="text-slate-500 dark:text-slate-400" >Meals Logged</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{todayFood.length} </span>
            </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center py-2 border-b border-slate-100 dark:border-slate-800 justify-between">
            <span className="text-slate-500 dark:text-slate-400" >Total Calories</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{totalCalories} Kcal  </span>
            </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center py-2   justify-between">
            <span className="text-slate-500 dark:text-slate-400" >Active Minutes</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{TotalActiveminutes} </span>
            </div>
        </div>
        
        </Card>

        {/* Activity Chart */}
        <Card className="col-span-2 shadow-lg">
          <h3 className="font-semibold  text-slate-700 dark:text-white mb-2">
            This Week's Progess
          </h3>
          <CaloriesChart/>
          </Card>
     </div>
    </div>
  )
}

export default Dashboard
