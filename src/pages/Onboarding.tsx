import { ArrowLeft, ArrowRight, PersonStanding, ScaleIcon, Target, User } from "lucide-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useAppContext } from "../context/AppContext"
import Input from "../components/ui/Input"
import type { ProfileFormData, UserData } from "../types"
import Button from "../components/ui/Button"
import mockApi from "../assets/FitTrack_Assets/assets/mockApi"
import { goalOptions } from "../assets/FitTrack_Assets/assets/assets"


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

  const updateFormData = (field: keyof ProfileFormData, value: string | number) => {
    // setFormData((prev) => ({ ...prev, [field]: value }))
    setFormData({...formData, [field]: value })
  }
  const handleNext = async() => {
    if(step ===1){
      if(!formData.age || Number(formData.age) < 13 || Number(formData.age) > 100){
        if(!formData.age){
          toast("Age is required")
          return
        }else{
          toast("Please enter a valid age between 13 and 100")
          return
        }
      }
    }
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      const userdata ={
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: formData.height ? Number(formData.height) : null,
        createdAt: new Date(),
      }
      localStorage.setItem("fitnessUser", JSON.stringify(userdata))
      await mockApi.user.update(user?.id || "", userdata  as unknown as Partial<UserData>)
      setOnboardingCompleted(true)
      fetchUser(user?.token|| "")
    }
  }
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
       <div className="px-6 mb-8 onboarding-wrapper">
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
       <div className="onboarding-wrapper flex-1  px-6 flex flex-col">
          <div className="flex-1">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex gap-4 items-center mb-8 ">
                  <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border
                  border-emerald-100 dark:border-emerald-800 flex items-center justify-center"
                  ><User className="size-6 text-emerald-600
                  dark:text-emerald-400"/></div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">How old are you</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">This helps us calculate your needs</p>
                  </div>
                </div>
                <Input  label="Age"
                type="number"
                className="max-w-2xl"
                value={formData.age}
                onChange={(value) => updateFormData("age", value)}
                placeholder="Enter your age"
                min={13} max={100} required/>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6 onboarding-wrapper">
                <div className="flex gap-4 items-center mb-8 ">
                  <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border
                  border-emerald-100 dark:border-emerald-800 flex items-center justify-center"
                  ><ScaleIcon className="size-6 text-emerald-600
                  dark:text-emerald-400"/></div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Your measurements</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Helps us track your progress</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 max-w-2xl">
                <Input  label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={(value) => updateFormData("weight", value)}
                placeholder="Enter your weight in kg"
                min={13} max={300} required/>
                <Input  label="Height (cm) - optional"
                type="number"
                className="max-w-2xl mt-4"
                value={formData.height}
                onChange={(value) => updateFormData("height", value)}
                placeholder="Enter your height in cm"
                min={100} max={250} />
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6 onboarding-wrapper">
                <div className="flex gap-4 items-center mb-8 ">
                  <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border
                  border-emerald-100 dark:border-emerald-800 flex items-center justify-center"
                  ><Target className="size-6 text-emerald-600
                  dark:text-emerald-400"/></div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">What's your goal</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">We will Tailor your experience to your goals</p>
                  </div>
                </div>
                  {/* options */}
                  <div className="space-y-4  max-w-lg">
                  {goalOptions.map((option) => (
                    <div key={option.value} className={`p-4 rounded-lg border cursor-pointer
                    ${formData.goal === option.value ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10" : "border-slate-300 dark:border-slate-800"}`}
                    onClick={() => updateFormData("goal", option.value)}
                    >
                      <h3 className="font-medium text-slate-800 dark:text-white">{option.label}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{option.description}</p>
                    </div>
                    ))}
                  </div>
              </div>
            )}
          </div>
          
          {/* Buttons at bottom right */}
          <div className="pb-10 p-7 onboarding-wrapper ">
            <div className="flex gap-3 lg:justify-end">

            {step > 1 && (
              <Button variant="secondary" className="max-lg:flex-1 lg:px-10" onClick={() => setStep((p) => p > 1 ? p - 1 : p)}>
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </span>
              </Button>
            )}
            <Button onClick={handleNext} className="max-lg:flex-1 lg:px-10">
              {step === totalSteps ? 'Get Started' :
               <span className="flex items-center justify-center gap-2">
                  Next <ArrowRight className="w-5 h-5" />
                </span>}
            </Button>
                </div>
          </div>
       </div>
      </div>
    </>
  )
}

export default Onboarding
