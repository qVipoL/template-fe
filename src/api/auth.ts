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

type LoginResponseData = {
  token: string;
  user: User;
};

type GetCurrentUserResponseData = {
  user: User;
};

const AuthEndpoints = {
  Login: "/users/login",
  Register: "/users/registerUser",
  CurrentUser: "/users/currentUser",
  UpdateConfig: "/users/updateUserSettings",
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

type UpdateUserConfig = {
  settings: {
    answerVariant: number;
    timeExtention: boolean;
    includeLaw: boolean;
    answerDisplayEnd: boolean;
    timerVariant: number;
    arrowVariant: number;
    questionsFromLaws: string[];
    totalQuestions: number;
  };
};

export const updateUserConfig = (body: UpdateUserConfig) => {
  return API.post(AuthEndpoints.UpdateConfig, body);
};
