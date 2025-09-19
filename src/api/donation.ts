import axios from "axios";
import type { DonationDto } from "../lib/Types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createDonation(
  data: DonationDto,
  donorId: number,
  token: string
) {
  console.log(data);

  const response = await axios.post(
    `${baseUrl}/api/donation`,
    { ...data, donorId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function getAllDonations(
  token: string,
  sorting: string,
  search: string
) {
  const response = await axios.get(`${baseUrl}/api/donation`, {
    params: {
      sorting,
      search: search,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function getAllDonationsByDonorId(
  donorId: number,
  token: string,
  sorting: string,
  search: string
) {
  const response = await axios.get(`${baseUrl}/api/donation/donor/${donorId}`, {
    params: {
      sorting,
      search: search,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function getDonationById(donationId: number, token: string) {
  const response = await axios.get(`${baseUrl}/api/donation/${donationId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function updateDonation(
  donationDto: DonationDto,
  donationId: number,
  token: string
) {
  const response = await axios.put(
    `${baseUrl}/api/donation/${donationId}`,
    { ...donationDto, quantity: Number(donationDto.quantity) },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function deleteDonation(donationId: number, token: string) {
  const response = await axios.delete(`${baseUrl}/api/donation/${donationId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}
