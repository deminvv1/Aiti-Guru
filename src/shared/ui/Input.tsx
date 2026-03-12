"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ButtonProps, InputProps } from "../types";

export const Input = ({ label, type = "text", ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const currentType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-slate-700 ml-0.5">
        {label}
      </label>
      <div className="relative w-full">
        <input
          {...props}
          type={currentType}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 pr-12"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const Button = ({ children, ...props }: ButtonProps) => (
  <button
    {...props}
    className="w-full bg-[#007AFF] hover:bg-[#0063CC] text-white font-semibold
    py-3 px-4 rounded-xl transition-colors duration-200 shadow-sm cursor-pointer" 
  >
    {children}
  </button>
);
