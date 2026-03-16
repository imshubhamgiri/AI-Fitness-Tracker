import {  useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext"
import { useTheme } from "../context/ContextAp";
import type { ProfileFormData, UserData } from "../types";
import Card from "../components/ui/Card";
import { Calendar, LogOutIcon, MoonIcon, Ruler, Scale, SunIcon, Target, User } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { goalOptions } from "../assets/FitTrack_Assets/assets/assets";
import mockApi from "../assets/FitTrack_Assets/assets/mockApi";
import toast from "react-hot-toast";


const Profile = () => {
  const {user , fetchUser ,logout , allFoodLogs , allActivityLogs} = useAppContext();
  const{theme,toggleTheme} = useTheme();
  const[editing , setEditing] = useState(false);
  const [form , setForm] = useState<ProfileFormData>({
    age:0,
    weight:0,
    height:0,
    goal:'maintain',
    dailyCalorieBurn:400,
    dailyCalorieIntake:2000
  })
  const fetchuseData = () =>{
    if(user){
      setForm({
    age:user?.age || 0,
    weight:user?.weight || 0,
    height:user?.height || 0,
    goal:user?.goal || 'maintain',
    dailyCalorieBurn:user?.dailyCalorieBurn || 400,
    dailyCalorieIntake:Number(user?.dailyCalorieIntake || 2000)

      })
    }

    useEffect(() => {
      fetchuseData();
    }, [user])
    
    if(!user || !form){
      return null;
    }
  }
  const getStat = () => {
  const TotalActivityEntry = allActivityLogs.length;
  const TotalFoodEntries = allFoodLogs.length;

  return {
    TotalActivityEntry,
    TotalFoodEntries
  }
  
  }
  const stats = getStat();
  const handleSave = async () =>{
    try {
      const updates: Partial<UserData> = {
        ...form,
        goal: form.goal as 'lose' | 'maintain' | 'gain',
     
      };
      await mockApi.user.update(user?.id || '', updates);
      await fetchUser(user?.token || '');
      toast.success('Profile updated successfully');
    } catch (error:any) {
      console.error(error);
      toast.error('Failed to update profile: ' + error.message);
      
    }
    setEditing(false);
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center justify-between">
           <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Profile</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage your Settings</p>
           </div>
        </div>
      </div>

     <div className="profile-content">
      {/* Left content */}
      <Card>
        {/* Card Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="size-12 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <User className="size-6 text-white"/>
          </div>
          <div>
            <h2 className="text-lg font-semibold to-slate-800 dark:text-white">Your Profile</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Member Since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
          </div>
          </div>
          {editing ? (
            <div className="space-y-4">
              {/* Form for editing profile */}
              <Input label="Age" type="number" value={form.age} onChange={(v) => setForm({...form, age: Number(v)})} min={13} max={120}/>
              <Input label="Weight (kg)" type="number" value={form.weight} onChange={(v) => setForm({...form, weight: Number(v)})} min={2} max={300} />
              <Input label="Height (cm)" type="number" value={form.height} onChange={(v) => setForm({...form, height: Number(v)})} min={50} max={250} />
              <Select options={goalOptions} 
              label="Fitness Goal" value={form.goal as string} onChange={(v)=>(setForm({...form, goal: v as 'lose' | 'maintain' | 'gain'}))}/>
              <div className="flex gap-2 mt-4">
                <Button variant="secondary" className="flex-1" onClick={() => {
                  // Reset form to original user data and exit edit mo
                  setEditing(false);
                  setForm({
                    age:Number(user?.age || 0),
                    weight:Number(user?.weight || 0),
                    height:Number(user?.height || 0),
                    goal:user?.goal || '' as 'lose' | 'maintain' | 'gain',
                    dailyCalorieBurn:user?.dailyCalorieBurn || 400,
                    dailyCalorieIntake:Number(user?.dailyCalorieIntake || 2000)
                  })
                }}>Cancel</Button>
                <Button variant="primary" className="mr-2 flex-1" onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3  bg-slate-50 dark:bg-slate-800
               rounded-lg transition-colors duration-200">
                  <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center
                  justify-center">
                    <Calendar className="size-4 text-blue-600 dark:text-blue-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Age</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{user?.age} years</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 p-3  bg-slate-50 dark:bg-slate-800
               rounded-lg transition-colors duration-200">
                <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center
                  justify-center">
                    <Scale className="size-4 text-purple-600 dark:text-purple-400"/>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Weight</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{user?.weight} kg</p>
                  </div>
              </div>
              {/* Height */}
              {user?.height && (
                <div className="flex items-center gap-4 p-3  bg-slate-50 dark:bg-slate-800
                 rounded-lg transition-colors duration-200">
                  <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center
                    justify-center">
                      <Ruler className="size-4 text-green-600 dark:text-green-400"/>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Height</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{user?.height} cm</p>
                    </div>
                </div>
              )}
               {/* Goal */}
               {user?.goal && (
                <div className="flex items-center gap-4 p-3  bg-slate-50 dark:bg-slate-800
                 rounded-lg transition-colors duration-200">
                  <div className="size-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center
                    justify-center">
                      <Target className="size-4 text-yellow-600 dark:text-yellow-400"/>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Goal</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{user?.goal}</p>
                    </div>
                </div>
               )}

            </div>
            <Button variant="secondary"  className="w-full mt-4"
             type="button" onClick={() => setEditing(true)}>Edit Profile</Button>
            </>
          )}
      </Card>
      {/* right  cotent*/}
      <div className="space-y-4">
          {/* Stats */}
          <Card>
           < h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Your Stats</h2>
           <div className="grid grid-cols-2 gap-4">
            <div className="text-center bg-emerald-50 p-4 dark:bg-emerald-900/10  rounded-xl">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.TotalFoodEntries}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Food Entry</p>
            </div>
            <div className="text-center bg-blue-50 p-4 dark:bg-blue-900/10  rounded-xl">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.TotalActivityEntry}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Activities</p>
            </div>
           </div>
            </Card>
            {/* Toggle theme button for mobile */}
            <div className="lg:hidden">
            <Button 
             variant="secondary" className="w-full " onClick={toggleTheme}>
               {theme === 'light' ? <MoonIcon className="size-5"/> : <SunIcon className="size-5"/>} Mode
            </Button>
          </div>
            <Button variant="danger" className="w-full ring ring-red-300 hover:ring-2" onClick={logout}>
              <LogOutIcon className="size-5"/>
              Logout
            </Button>
      </div>
     </div>
      </div>
  )
}

export default Profile
