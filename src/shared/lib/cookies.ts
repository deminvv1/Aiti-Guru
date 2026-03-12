import Cookies from "js-cookie";

export const setAuthToken = (accessToken: string, rememberMe: boolean) => {
  const options: Cookies.CookieAttributes = {
    secure: true,
    sameSite: "strict",
  };

  if (rememberMe) {
    options.expires = 7;
    Cookies.set("auth-token", accessToken, options);
  } else {
    sessionStorage.setItem("auth-token", accessToken); // для удаления кук при закрытии вкладки, без галочки
  }
};

export const getAuthToken = () => {
  return Cookies.get("auth-token") || sessionStorage.getItem("auth-token");
};

export const removeAuthToken = () => {
  Cookies.remove("auth-token");
  sessionStorage.removeItem("auth-token");
};
