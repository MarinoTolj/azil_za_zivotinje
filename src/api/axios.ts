import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://azil-za-zivotinje-backend.vercel.app"
    : "http://localhost:3000";
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosProtected = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
