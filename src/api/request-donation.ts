import axios from "axios";
import type { RequestDonationDto } from "../lib/Types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createRequestDonationApi(
  data: RequestDonationDto,
  token: string
) {
  const response = await axios.post(`${baseUrl}/api/request-donation`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function deleteRequestDonations(requestId: number, token: string) {
  const response = await axios.delete(
    `${baseUrl}/api/request-donation/request/${requestId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}
