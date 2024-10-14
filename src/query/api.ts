import {Result} from "../types.ts";
import {BASE_URL} from "../constants.ts";
import {Synset, Topic, WordCore, WordRelation} from "./types.ts";
import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {handleAxiosError} from "../api.ts";
import axios from "axios";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useGetWordCore =
  (word: string): QueryObserverResult<WordCore, Error> => {
    return useQuery<WordCore, Error>({
      queryKey: ['getWordCore', word],
      queryFn: async (): Promise<WordCore> => {
        return client.get<Result<WordCore>>(`/word/${word}/core`)
          .then(response => response.data.data)
          .catch(handleAxiosError)
      },
      staleTime: Infinity
    })
  }

export const useGetWordRelation =
  (word: string): QueryObserverResult<WordRelation, Error> => {
    return useQuery<WordRelation, Error>({
      queryKey: ['getWordRelation', word],
      queryFn: async (): Promise<WordRelation> => {
        return client.get<Result<WordRelation>>(`/word/${word}/relation`)
          .then(response => response.data.data)
          .catch(handleAxiosError)
      },
      staleTime: Infinity
    })
  }

export const useGetTopic =
  (fromWhere: string, topicKey: string): QueryObserverResult<Topic, Error> => {
    return useQuery<Topic, Error>({
      queryKey: ['getTopic', fromWhere, topicKey],
      queryFn: async (): Promise<Topic> => {
        return client.get<Result<Topic>>(`/topic/${fromWhere}/${topicKey}`)
          .then(response => response.data.data)
          .catch(handleAxiosError)
      },
      staleTime: Infinity
    })
  }

export const useGetSynset =
  (fromWhere: string, synsetKey: string): QueryObserverResult<Synset, Error> => {
    return useQuery<Synset, Error>({
      queryKey: ['getSynset', fromWhere, synsetKey],
      queryFn: async (): Promise<Synset> => {
        return client.get<Result<Synset>>(`/synset/${fromWhere}/${synsetKey}`)
          .then(response => response.data.data)
          .catch(handleAxiosError)
      },
      staleTime: Infinity
    })
  }