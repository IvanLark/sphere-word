import alova from "../index.ts";
import {UserAuthData} from "../types/auth.types.ts";

export const login =
  (data: UserAuthData) =>
    alova.Post<string>('/user/login', {
      username: data.username,
      password: data.password
    })

export const signup =
  (data: UserAuthData) =>
    alova.Post<string>('/user/sign_up', data)

export const checkLogin =
  () => alova.Get<null>('/user/check_login')