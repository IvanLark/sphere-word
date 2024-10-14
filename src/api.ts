import {AxiosError} from "axios";
import {Result} from "./types.ts";

export const handleAxiosError =
  (error: AxiosError<Result<null>>) => {
    if (error.response) {
      throw new Error(error.response.data.msg);
    } else {
      throw error;
    }
  }