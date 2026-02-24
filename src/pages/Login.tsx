import { AtSignIcon, Eye, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
const Login = () => {
  const [state, setState] = useState('signup')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Issubmitting , SetIssubmitting] = useState(false);

  const navigate = useNavigate();
  const {login , signup , user} = useAppContext();

  useEffect(() => {
    if(user) {
      navigate('/');
    }

  }, [user , navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    SetIssubmitting(true);
    if(state === 'login') {
      await login({email, password});
    } else {
      await signup({username, email, password});
    }
    SetIssubmitting(false);
  }
  
  return (
    <>
    <main className="login-page-container">
      <form className="login-form" action="" onSubmit={handleSubmit}>
        <h2 className="text-gray-900 text-2xl font-medium dark:text-white">{state === 'login' ? 'Sign In' : 'Sign Up'}</h2>
        <p className="dark:text-gray-400 mt-2 text-sm font-light text-gray-500/90">
          {state === 'login' ? "Please enter Your credentials for Login" : "Please fill the form to create an account"}
        </p>
        {state !== 'login' && (
          <div className="mt-4 ">
            <label htmlFor="" className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Username
            </label>
            <div className="relative mt-1">
              <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400  size-4" />
              <input type="text"  
              className="login-input "
              required
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>
        )}
          <div className="mt-4 ">
            <label htmlFor="" className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative mt-1">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400  size-4" />
              <input type="email"  
              className="login-input "
              required
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          {/* Password */}
          <div className="mt-4 ">
            <label htmlFor="" className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400  size-4" />
              <input type={showPassword ? "text" : "password"} 
              className="login-input pr-10"
              required
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
              <button onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOffIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400  size-4 cursor-pointer" />
              ) : (
                <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400  size-4 cursor-pointer"/>
              )}
              </button>
            </div>
          </div>
        <button className="login-button" type="submit" disabled={Issubmitting}>
          {Issubmitting? "Processing..." : state === 'login' ? 'Login' : 'Sign Up'}</button>
        <p className="dark:text-gray-400 text-center  text-sm font-light text-gray-500/90">
          {state === 'login' ? "Don't have an account? " : "Already have an account? "}
          <span className="text-green-600 hover:scale-110  transition-ease-in hover:underline cursor-pointer" onClick={() => setState(state === 'login' ? 'signup' : 'login')}>
            {state === 'login' ? "Sign Up" : "Login"}
          </span>
        </p>

      </form>
    </main>
    </>
  )
}

export default Login
