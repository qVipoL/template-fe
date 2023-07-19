import { User } from "src/constants/types";
import { API } from "./API";

type LoginRequestBody = {
  email: string;
  password: string;
};

type RegisterRequestBody = {
  email: string;
  name: string;
  password: string;
  phone?: string;
};

type LoginResponseData = User;

type GetCurrentUserResponseData = User;

const AuthEndpoints = {
  Login: "/users/login",
  Register: "/users/registerUser",
  CurrentUser: "/users/user",
};

export const login = (body: LoginRequestBody) => {
  return API.post<LoginResponseData>(AuthEndpoints.Login, body);
};

export const register = (body: RegisterRequestBody) => {
  return API.post(AuthEndpoints.Register, body);
};

export const getCurrentUser = () => {
  return API.get<GetCurrentUserResponseData>(AuthEndpoints.CurrentUser);
};
