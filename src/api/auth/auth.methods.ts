import alova from "../api.index.ts";
import {UserAuthData} from "./auth.types.ts";

export const login =
  (data: UserAuthData) =>
    alova.Post<string>('/user/login', {
      username: data.username,
      password: data.password
    });

export const signup =
  (data: UserAuthData) =>
    alova.Post<string>('/user/sign_up', data);
