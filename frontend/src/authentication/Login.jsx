import { useContext, useState } from "react"; // 1. Ensure useContext is here
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schemas/authSchemas";
import apiRequest from "../lib/apiRequest";


function Login() {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      // 5. Use apiRequest to ensure it hits http://localhost:8800/api
      const res = await apiRequest.post("/auth/login", data);
      
      navigate("/");
    } catch (err) {
      // 6. Check console if something goes wrong
      console.log(err);
      setServerError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex text-gray-800">
      <div className="flex-[3] h-full flex items-center justify-center p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-md">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          
          <div className="flex flex-col gap-1">
            <input
              {...register("username")}
              placeholder="Username"
              className={`p-5 border rounded-md outline-teal-600 ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`p-5 border rounded-md outline-teal-600 ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <button 
            disabled={isLoading} 
            className="p-5 rounded-md bg-teal-600 text-white font-bold hover:bg-teal-700 disabled:bg-[#BED9D8] disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

          {serverError && <span className="text-red-600 text-center font-medium">{serverError}</span>}
          
          <Link to="/register" className="text-sm text-gray-500 border-b border-gray-500 w-max self-center">
            {"Don't"} you have an account?
          </Link>
        </form>
      </div>

      <div className="hidden md:flex flex-[2] bg-[#fcf5f3] items-center justify-center">
        {/* Assumes bg.png is in your public folder */}
        <img src="/bg.png" alt="" className="w-full" />
      </div>
    </div>
  );
}

export default Login;