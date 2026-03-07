import { ActivityIcon, HomeIcon, MoonIcon, PersonStandingIcon, Sun, UserIcon, UtensilsIcon } from "lucide-react"
import { useTheme } from "../context/ContextAp"
import { NavLink } from "react-router-dom"


const Sidebar = () => {
    const navitems =[
        {path:'/' ,label:'Home', icon:HomeIcon},
        {path:'/food' ,label:'Food', icon:UtensilsIcon},
        {path:'/activity' ,label:'Activity', icon:ActivityIcon},
        {path:'/profile' ,label:'Profile', icon:UserIcon},
    ]
    const {theme, toggleTheme} = useTheme()
  return (
    <nav className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 p-6 border-r
     border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-xl bg-emerald-500 flex items-center
        justify-center">
            <PersonStandingIcon className="size-7 text-white" /></div>
        <h1 className="text-2xl font-bold text-slate-800 
        dark:text-white">
            FitTrack
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        {navitems.map((item) => (
            <NavLink
                to={item.path}
                key={item.path}
                className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg p-2 transition-colors duration-200 ${
                        isActive
                            ? "bg-emerald-500 text-white"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`
                }
            >
                <item.icon className="size-5" />
                <span className="text-base">{item.label}</span>
            </NavLink>
        ))}
      </div>
      <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-4">
        <button
            onClick={toggleTheme}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
        >
            {theme === "light" ? <MoonIcon /> : <Sun />}
            <span className="text-base">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>
    </nav>
  )
}

export default Sidebar
