import { BASE_URL } from "@/lib/constants";

const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
};

const login = async (email: string, password: string) => {
  return fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: "include",
  });
};

const logout = async () => {
  return fetch(`${BASE_URL}/user/logout`, {
    method: "POST",
    credentials: "include",
  });
};
export { register, login, logout };
