import { useAppContext } from "../context/AppContext"


const Dashboard = () => {
  const {user} = useAppContext();
  return (
    <div className="page-container">
    {/* Header */}
    <div className="dashboard-header">
    <p className="text-emerald-100 text-sm font-medium">
      Welcome Back
    </p>
    <h1 className="">
      {user?.username || 'User'}!
    </h1>
    </div>
    </div>
  )
}

export default Dashboard
