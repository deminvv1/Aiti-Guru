import { InputHTMLAttributes, ButtonHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface AuthFormData {
  username: string;
  password: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  selected: boolean;
  price: number;
  sku: string;
  ratingColor: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}