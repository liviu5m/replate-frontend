import axios from "axios";
import type { Message, MessageDto } from "../lib/Types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function saveMessage(messageDto: MessageDto, token: string):Promise<Message> {
  const response = await axios.post(`${baseUrl}/api/message`, messageDto, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function getMessages(userA: number, userB: number, token: string) {
  const response = await axios.get(`${baseUrl}/api/message/conversation`, {
    params: {
      userA,
      userB,
    },
    headers: {
      Authorization: "Bearer " + token
    },
    withCredentials: true,
  })
  return response.data;
}