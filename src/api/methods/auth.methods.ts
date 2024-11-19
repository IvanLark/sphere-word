import alova from "../index.ts";
import {UserSignUpData} from "../types/auth.types.ts";

export const login =
  (username: string, password: string) =>
    alova.Post<string>('/user/login', {
      username: username,
      password: password
    })

export const signup =
  (data: UserSignUpData) =>
    alova.Post<string>('/user/sign_up', data)

export const checkLogin =
  () => alova.Get<null>('/user/check_login')