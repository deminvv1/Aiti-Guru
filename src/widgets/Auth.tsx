"use client";
import { useEffect, useState } from "react";
import { Button, Input } from "../shared/ui/Input";
import { loginByUsername } from "../features/api";
import { useRouter } from "next/navigation";
import { getAuthToken, setAuthToken } from "../shared/lib/cookies";
import toast from "react-hot-toast";

export const AuthCard = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nav = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginByUsername(formData);

      if (data.accessToken) {
        setAuthToken(data.accessToken, rememberMe);
        nav.push("/goobs");
      }
      toast.success("Вы успешно авторизовались");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Произошла ошибка");
      }
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      nav.push("/goobs");
    }
  }, [nav]);

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full max-w-[420px] bg-white p-8 md:p-10 rounded-[32px] shadow-2xl shadow-slate-200/60">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <div className="w-6 h-6 bg-[#007AFF] rounded-lg rotate-12" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Добро пожаловать!
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Пожалуйста, авторизуйтесь
          </p>
        </div>

        <div className="space-y-5">
          <Input
            autoFocus
            label="Логин"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Введите ваш логин"
          />

          <Input
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />

              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                Запомнить данные
              </span>
            </label>
          </div>
          {error && (
            <p className="text-red-500 text-xs font-medium px-1">{error}</p>
          )}
          <Button type="submit">Войти</Button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Нет аккаукнта?{" "}
          <button
            className="font-semibold text-[#007AFF] hover:underline cursor-pointer"
            type="button"
          >
            Создать
          </button>
        </p>
      </div>
    </form>
  );
};
