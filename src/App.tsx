import { Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import FoodLog from "./pages/FoodLog"
import ActivityLog from "./pages/ActivityLog"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import { useAppContext } from "./context/AppContext"
import Loading from "./components/Loading"
import Onboarding from "./pages/Onboarding"


function App() {
  const {isUserFetched , onboardingCompleted , user} = useAppContext();

  if(!user){
    return isUserFetched ? <Login/> : <Loading/>;
  }

  if(!onboardingCompleted){
    return <Onboarding/>
  }

  return (
    <>
    <Routes>
      <Route path="/" element = {<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="food" element={<FoodLog/>}/>
        <Route path="activity" element={<ActivityLog/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="login" element={<Login/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
