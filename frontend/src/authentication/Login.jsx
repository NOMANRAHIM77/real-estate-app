import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

// Define the validation schema
const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  password: z.string().min(1, "Password is required"),
});

function Login() {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize React Hook Form
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
      const res = await apiRequest.post("/auth/login", data);
      updateUser(res.data);
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex text-gray-800">
      {/* Form Container */}
      <div className="flex-[3] h-full flex items-center justify-center p-4">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="flex flex-col gap-5 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          
          <div className="flex flex-col gap-1">
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className={`p-5 border rounded-md outline-teal-600 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`p-5 border rounded-md outline-teal-600 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <button
            disabled={isLoading}
            className="p-5 rounded-md border-none bg-teal-600 text-white font-bold cursor-pointer transition-colors hover:bg-teal-700 disabled:bg-[#BED9D8] disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {serverError && <span className="text-red-600 text-center">{serverError}</span>}

          <Link 
            to="/register" 
            className="text-sm text-gray-500 border-b border-gray-500 w-max self-center"
          >
            {"Don't"} you have an account?
          </Link>
        </form>
      </div>

      {/* Image Container */}
      <div className="hidden md:flex flex-[2] bg-[#fcf5f3] items-center justify-center">
        <img src="/bg.png" alt="Background" className="w-full" />
      </div>
    </div>
  );
}

export default Login;