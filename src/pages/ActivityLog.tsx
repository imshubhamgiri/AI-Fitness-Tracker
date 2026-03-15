import { quickActivities } from "../assets/FitTrack_Assets/assets/assets";
import Card from "../components/ui/Card";
import { useAppContext } from "../context/AppContext"
import { useEffect, useState } from "react";
import type { ActivityEntry } from "../types";
import Button from "../components/ui/Button";
import { ActivityIcon, DumbbellIcon, PlusIcon, TimerIcon, Trash2Icon } from "lucide-react";
import Input from "../components/ui/Input";
import mockApi from "../assets/FitTrack_Assets/assets/mockApi";
import toast from "react-hot-toast";


const ActivityLog = () => {
  const {allActivityLogs , setAllActivityLogs} = useAppContext();
  const [showForm , setShowForm] = useState(false);
  const [activities , setActivities] = useState<ActivityEntry[]>([])
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
      setShowForm(true);
  }

    const LoadActivities = ()=>{
      const TodayActivity = allActivityLogs.filter((a: ActivityEntry )=> a.createdAt?.split('T')[0] === Today);
      setActivities(TodayActivity);
    }

    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) =>{
       e.preventDefault();
       const {data} = await mockApi.activityLogs.create({data:formData});
       setAllActivityLogs((e)=>[...e , data]);
       setFormData({name:'' ,calories:0, duration:0 });
      setShowForm(false);
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

    const handleDelete = async(documentId : string)=>{
    try {
      const confirm = window.confirm('Are You Really want to delete This Entry')
      if(confirm){
        await mockApi.activityLogs.delete(documentId);
        setAllActivityLogs(prev => prev.filter(log => log.documentId !== documentId));
      }
    } catch (error : any) {
      console.error("Failed to delete food entry:", error);
      toast( error?.message ||'failed To Delete food');
    }
  }

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
            placeholder="Enter Activity name" required />

            <div className="flex gap-4">
            <Input label="Duration (min)" type="number" className="flex-1" value={formData.duration} onChange={handleDurationChnage} placeholder="e.g., 250"
            min={1} max={300} required/>

            <Input label="Calores Burned" type="number"  className="flex-1"
            value={formData.calories} onChange={(e)=>setFormData({...formData , calories:Number(e)})} placeholder="e.g., 250"
            min={1} max={2000} required/>   

            </div>   
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">

              <Button onClick={()=>(setShowForm(false), setFormData({name: "", calories: 0, duration: 0}), setError(''))} type="button"
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
       {/* acitivites list */}
       {activities.length === 0 ?(
        <Card className="text-center py-12">
          <div className="w-16 h-16  rounded-2xl bg-slate-100 dark:bg-slate-800
          flex items-center justify-center mx-auto mb-4">
            <DumbbellIcon/>
          </div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200
           mb-2">No Activities Logged Today</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm ">Start Moving and Track your progress</p>

        </Card>
       ):(
        <Card className="">
          <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
            <ActivityIcon className="size-5 text-blue-600"/>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white">
              Today's Activities</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{activities.length} Logged </p>
          </div>
          </div>
          <div className="space-y-2">
            {activities.map((activity)=>(
              <div key={activity.id} className="activity-entry-item">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/20
                  flex items-center justify-center"
                  ><TimerIcon className="size-5 text-blue-800 dark:text-blue-400" /></div>
                  <div>
                    <p>  {activity.name}     </p>
                    <p className="text-sm text-slate-400 dark:text-shadow-sky-200">{new Date(activity?.createdAt || '').toLocaleDateString('en-US',{
                      hour:'2-digit' ,minute:'2-digit'
                    })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{activity.duration} min</p>
                      <p className="text-xs text-slate-400">{activity.calories} Kcal</p>
                    </div>
                    <button onClick={()=>handleDelete(activity.documentId)} 
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50
                    dark:hover:bg-red-900/20 rounded-xl transition-colors">
                      <Trash2Icon className="w-4 h-4"/>
                    </button>
                </div>
              </div>
            ))}
          </div>
          {/* Total Summary */}
          <div className="flex mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">Total Active Time</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{minutes}</span>
          </div>
        </Card>
       )}
      </div>
    </div>
  )
}

export default ActivityLog
