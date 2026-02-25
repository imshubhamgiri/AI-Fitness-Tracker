import { PersonStanding } from "lucide-react"
import { Toaster } from "react-hot-toast"


const Onboarding = () => {
  return (
    <>
    <Toaster/>
      <div className="onboarding-container">
       <div className="onboarding-wrapper p-6 pt-12">
          <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex
              items-center justify-center">
                <PersonStanding className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 
              dark:text-white">FitTrack</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300">Track your fitness journey with ease and precision.</p>
       </div>
      </div>
    </>
  )
}

export default Onboarding
