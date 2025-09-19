import axios from "axios";

let baseUrl = import.meta.env.VITE_API_URL;

export async function addImage(image: File | null, token: string) {
  const formData = new FormData();
  formData.append("file", image || "");
  const response = await axios.post(baseUrl + "/api/cloudinary", formData, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
}
