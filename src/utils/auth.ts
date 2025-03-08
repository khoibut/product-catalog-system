import axios from "axios";

export const signup = async (name: string, email: string, password: string) => {
  return await axios.post("/api/auth/signup", { name, email, password }).then((res) => res.data);
};

export const login = async (email: string, password: string) => {
  return await axios.post("/api/auth/login", { email, password }).then((res) => res.data);
};
