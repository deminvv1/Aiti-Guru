import Cookies from "js-cookie";

export const setAuthToken = (accessToken: string, rememberMe: boolean) => {
  const options: Cookies.CookieAttributes = {
    secure: true,
    sameSite: "strict",
  };

  if (rememberMe) {
    options.expires = 7;
  }

  Cookies.set("auth-token", accessToken, options);
};

export const getAuthToken = () => Cookies.get("auth-token");
export const removeAuthToken = () => {
  Cookies.remove("__next_hmr_refresh_hash__", { path: "/" });
  Cookies.remove("auth-token");
};
