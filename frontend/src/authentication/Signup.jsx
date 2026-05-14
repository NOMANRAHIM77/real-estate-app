import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios'

import { registerSchema } from "./schemas/authSchemas";
import apiRequest from "../lib/apiRequest";


function Signup() {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      await apiRequest.post("/auth/signup", data);
      navigate("/login");
    } catch (err) {
      setServerError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex text-gray-800">
      {/* Form Section */}
      <div className="flex-[3] h-full flex items-center justify-center p-4">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="flex flex-col gap-5 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold">Create an Account</h1>
          
          <div className="flex flex-col gap-1">
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className={`p-5 border rounded-md outline-teal-600 ${
                errors.username ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              className={`p-5 border rounded-md outline-teal-600 ${
                errors.email ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`p-5 border rounded-md outline-teal-600 ${
                errors.password ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <button
            disabled={isLoading}
            className="p-5 rounded-md border-none bg-teal-600 text-white font-bold cursor-pointer hover:bg-teal-700 transition-colors disabled:bg-[#bed9d8] disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>

          {serverError && (
            <span className="text-red-600 text-center font-medium">{serverError}</span>
          )}

          <Link 
            to="/login" 
            className="text-sm text-gray-500 border-b border-gray-500 w-max self-center"
          >
            Do you have an account?
          </Link>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex flex-[2] bg-[#fcf5f3] items-center justify-center">
        <img 
          src='./bg.png' 
          alt="Background" 
          className="w-full" 
        />
      </div>
    </div>
  );
}

export default Signup;