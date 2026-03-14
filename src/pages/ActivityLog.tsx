import { quickActivities } from "../assets/FitTrack_Assets/assets/assets";
import Card from "../components/ui/Card";
import { useAppContext } from "../context/AppContext"
import { useEffect, useState } from "react";
import type { ActivityEntry } from "../types";
import Button from "../components/ui/Button";
import { PlusIcon } from "lucide-react";
import Input from "../components/ui/Input";


const ActivityLog = () => {
  const {allActivityLogs , setAllActivityLogs} = useAppContext();
  const [showForm , setShowForm] = useState(false);
  const [activties , setActivities] = useState<ActivityEntry[]>(  )
  const [formData , setFormData] = useState({
    name:'',
    duration:0,
    calories:0
  })
  const [error , setError] =useState('')

  const Today = new Date().toISOString().split('T')[0];

  const handleQuickAdd = (activityname : {name:string, rate:number }) =>{
      setFormData({
        name:activityname.name,
        duration:30,
        calories:30* activityname.rate
      })
  }

    const LoadActivities = ()=>{
      const TodayActivity = allActivityLogs.filter((a: ActivityEntry )=> a.createdAt?.split('T')[0] === Today);
      setActivities(TodayActivity);
    }

    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) =>{
        const data = e.target.value;
    }

    const handleDurationChnage = (val: string | number)=>{
      const Duration = Number(val);
      const activity = quickActivities.find(a => a.name === formData.name);
      let calories = formData.calories;
      if(activity){
        calories = Duration* activity.rate;
      }
      setFormData({
        ...formData,
        duration:Duration,
        calories
      })
    }

    useEffect(()=>{
      LoadActivities();
    },[allActivityLogs])

  const minutes:number = allActivityLogs.reduce((sum , entry)=> sum + entry.duration ,0)  
  return (
    <div className="page-container">

       <div className="page-header">
        <div className="flex items-center justify-between">
           <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Activity Log</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Track your WorkOuts</p>
           </div>
           <div  className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Active Today</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
               {minutes} Min </p>
           </div>
        </div>
      </div>


      <div className="page-content-grid">

      {!showForm &&(
        <div className="space-y-4">
          <Card>
             <h3 className="mb-3 font-semibold text-slate-700 dark:text-slate-200">Quick Add</h3>
                        <div className="flex flex-wrap gap-2">
                          {quickActivities.map((activities)=>(
                            <button key={activities.name} onClick={()=>handleQuickAdd(activities)}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700
                            rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors ">
                              {activities.emoji} {activities.name}
                            </button>
                          ))}
                        </div>
          </Card>
             <Button className="w-full" onClick={()=>setShowForm(true)}>
                <PlusIcon className="size-5"/>
                Add Custom Entry
          </Button>

        </div>
      )}

       {showForm && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
        New Activity Entry
      </h3>
       <form className="space-y-4" onSubmit={handleSubmit} >
            <Input label="Activity Name"  value={formData.name} onChange={(e)=>setFormData({...formData , name: e.toString()})}
            placeholder="Enter food name" required />
            <Input label="Duration (min)" type="number" value={formData.duration} onChange={handleDurationChnage} placeholder="e.g., 250"
            min={1} max={300} required/>           
            <div className="flex gap-2 pt-2">

              <Button onClick={()=>(setShowForm(false), setFormData({name: "", calories: 0, duration: 0}))} type="button"
                className="flex-1 " variant="secondary">
                Cancel
              </Button>
      
              <Button type="submit" className="flex-1">
                Add Entry
              </Button>
            </div>
            </form>
        </Card>
       )}
      </div>
    </div>
  )
}

export default ActivityLog
