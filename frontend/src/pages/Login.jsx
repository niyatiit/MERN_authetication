import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast} from 'react-toastify'
const Login = () => {
  const navigate = useNavigate();

  const {backnedUrl , setUserData , setIsLoggedin} = useContext(AppContext)
  const [state, setState] = useState("Sign-Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler =async (e) =>{
    try{
      e.preventDefault()
      axios.defaults.withCredentials = true;
      if(state === 'Sign-Up'){
        const {data} = await axios.post(backnedUrl + '/api/auth/register' ,{username , email , password})

        if(data.success){
          setIsLoggedin(true)
          navigate('/')
        }
        else{
          toast.error(data.message)

        }
      }
    }
    catch(err){
      toast.error(err)
    }
  } 

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200">
        {/* Logo & App Name */}
        <div className="flex items-center gap-2 absolute top-6 left-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-gray-800">auth</span>
        </div>

        {/* Login / Sign Up Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl text-center">
            {state === "Sign-Up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {state === "Sign-Up"
              ? "Create your account"
              : "Login to your account!"}
          </p>

          <form className="space-y-5" onSubmit={onSubmitHandler}>
            {state === "Sign-Up" && (
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between text-sm hover:cursor-pointer">
              <p
                onClick={() => navigate("/reset-password")}
                className="text-purple-600 hover:underline"
              >
                Forgot password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-200 cursor-pointer"
            >
              {state}
            </button>
          </form>

          {state === "Sign-Up" ? (
            <p className="text-sm text-center text-gray-600 mt-6">
              {" "}
              Already have an account ?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-purple-600 hover:underline cursor-pointer"
              >
                {" "}
                Login here{" "}
              </span>{" "}
            </p>
          ) : (
            <p className="text-sm text-center text-gray-600 mt-2">
              {" "}
              Don't have an account ?{" "}
              <span
                onClick={() => setState("Sign-Up")}
                className="text-purple-600 hover:underline cursor-pointer"
              >
                {" "}
                Sign Up{" "}
              </span>{" "}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
