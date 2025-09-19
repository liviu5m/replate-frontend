import axios from "axios";
import type { RequestDto } from "../lib/Types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createRequestApi(data: RequestDto, token: string) {
  const response = await axios.post(`${baseUrl}/api/request`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function getAllRequests(
  ngoId: number,
  token: string,
  sorting: string
) {
  const response = await axios.get(`${baseUrl}/api/request`, {
    params: {
      ngoId,
      sorting,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function updateRequestStatus(
  token: string,
  requestDto: RequestDto,
  requestId: number
) {
  const response = await axios.put(
    `${baseUrl}/api/request/${requestId}`,
    requestDto,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function getAllRequestsByDriverId(
  token: string,
  driverId: number,
  sorting: string
) {
  const response = await axios.get(
    `${baseUrl}/api/request/driver/${driverId}`,
    {
      params: {
        sorting,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
  return response.data;
}
