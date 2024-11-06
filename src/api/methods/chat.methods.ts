import alova from "../index.ts";
import {ChatHistory} from "../../pages/chat/types.ts";

export const getChatHistory =
  () =>
    alova.Get<ChatHistory>('/chat/history')
