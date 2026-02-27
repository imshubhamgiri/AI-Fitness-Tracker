import { PersonStanding, User } from "lucide-react"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { useAppContext } from "../context/AppContext"


const Onboarding = () => {
  const [step, setStep] = useState(1)
  const { user, setOnboardingCompleted, fetchUser } = useAppContext()
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    goal:'maintain',
    dailyCalorieIntake: 2000,
    dailyCalorieBurn: 500,
  })
  const totalSteps = 3;
  
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
       {/* progress Indicator */}
       <div className="px-6 mb-8 obboarding-wrapper">
          <div className="flex gap-2 max-w-2xl">
          {[1, 2, 3].map((st) => (
            <div key={st} className={`w-2 h-1.5 flex-1 rounded-full
              transition-all duration-300 ${st <= step ? "bg-emerald-500" : 
                "bg-slate-300 dark:bg-slate-800"}`}/>
          ))}
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">Step {step} of {totalSteps}</p>
       </div>
       {/* form */}
       <div className="onboarding-wrapper flex-1 px-6 pb-6 flex flex-col">
          <div className="flex-1">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex gap-4 items-center mb-8 ">
                  <div><User className="size-6 text-emerald-600
                  dark:text-emerald-400"/></div>
                  <div>
                    <h2>How old are you</h2>
                    <p>This helps us calculate your needs</p>
                  </div>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="flex flex-col gap-4 max-w-md">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Step 2</h2>
                <p className="text-slate-600 dark:text-slate-300">Step 2 content coming soon...</p>
              </div>
            )}
            
            {step === 3 && (
              <div className="flex flex-col gap-4 max-w-md">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Step 3</h2>
                <p className="text-slate-600 dark:text-slate-300">Step 3 content coming soon...</p>
              </div>
            )}
          </div>
          
          {/* Buttons at bottom right */}
          <div className="flex gap-3 justify-end mt-6">
            {step > 1 && (
              <button className="btn btn-slate-500" onClick={() => setStep((p) => p > 1 ? p - 1 : p)}>
                Back
              </button>
            )}
            <button className="btn btn-emerald" onClick={() => setStep((p) => p < totalSteps ? p + 1 : p)}>
              {step === totalSteps ? 'Finish' : 'Next'}
            </button>
          </div>
       </div>
      </div>
    </>
  )
}

export default Onboarding
