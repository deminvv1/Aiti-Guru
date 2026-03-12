import { AuthFormData } from "../shared/types";

export const loginByUsername = async (data: AuthFormData) => {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      expiresInMins: 30,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Ошибка авторизации");
  }

  return response.json();
};
