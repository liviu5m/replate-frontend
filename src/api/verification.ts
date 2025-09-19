import axios from "axios";
import type { VerificationData } from "../lib/Types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createRequest(
  verificationData: VerificationData,
  token: string
) {
  console.log(verificationData);
  
  const response = await axios.post(
    baseUrl + "/api/verification",
    verificationData,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
  return response.data;
}
