import axios from "axios";
import type { ProfileDataType } from "../lib/Types";
import { useAppContext } from "../lib/AppContext";

type userData = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

type roleData = {
  role: string;
  address: string;
  phone: string;
  userId: number;
  type: string;
};

type verifyData = {
  code: string;
  userId: number;
};

type logInData = {
  email: string;
  password: string;
};

let baseUrl = import.meta.env.VITE_API_URL;

export async function createUser(formData: userData) {
  const response = await axios.post(baseUrl + "/auth/signup", formData);
  return response.data;
}

export async function setUpUserRole(formData: roleData) {
  const response = await axios.put(baseUrl + "/api/user/role", formData);
  return response.data;
}

export async function verifyUser(formData: verifyData) {
  const response = await axios.post(baseUrl + "/auth/verify", formData);
  return response.data;
}

export async function authenticate(formData: logInData) {
  const response = await axios.post(baseUrl + "/auth/login", formData);
  return response.data;
}

export async function getAuthenticatedUser(token: String) {
  const response = await axios.get(baseUrl + "/api/user/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function updateProfileData(
  data: ProfileDataType,
  userId: number,
  token: String
) {
  const response = await axios.put(
    baseUrl + "/api/user/" + userId,
    { ...data, updateType: "data" },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function updateProfilePicture(
  image: string,
  userId: number,
  token: string
) {
  const response = await axios.put(
    baseUrl + "/api/user/image/" + userId,
    {
      image,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function getAllUsersBesidesAuthenticatedOne(
  userId: number,
  token: string,
  username: string
) {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "/api/user/available",
    {
      params: {
        userId,
        username,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function getAllUsersConversation(userId: number, token: string) {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "/api/message/users",
    {
      params: {
        userId,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function getUserByEmail(userEmail: string, token: string) {
  const response = await axios.get(`${baseUrl}/api/user/${userEmail}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}
