import {BASE_URL} from "../constants.ts";
import axios from "axios";
import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {Result} from "../types.ts";
import {handleAxiosError} from "../api.ts";
import {ChatMessage} from "./types.ts";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useChat =
  (messages: Array<ChatMessage>): QueryObserverResult<string, Error> => {
    return useQuery<string, Error>({
      queryKey: ['chat', prompt],
      queryFn: async (): Promise<string> => {
        return client.post<Result<string>>('/chat', {
          messages: messages
        })
          .then(response => response.data.data)
          .catch(handleAxiosError)
      },
      staleTime: 0
    })
  }
