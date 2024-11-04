import { SelectedSlot } from "@/types/type";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEETOCAL_API_KEY as string;
const WORKSPACE = process.env.NEXT_PUBLIC_WORKSPACE as string;
const MEETING_SLUG = process.env.NEXT_PUBLIC_MEETING_SLUG as string;

const apiClient = axios.create({
  baseURL: WORKSPACE,
  headers: {
    "X-Api-Key": API_KEY,
  },
});
export const getAvailableSlots = async ({
  year,
  month,
  timezone,
}: {
  year: number;
  month: number;
  timezone: string;
}) => {
  try {
    const response = await apiClient.get(`/slots/${MEETING_SLUG}`, {
      params: {
        year,
        month,
        time_zone: timezone,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch appointments", error);
    throw error;
  }
};

export const addAppointment = async (appointment: Omit<SelectedSlot, "id">) => {
  try {
    const response = await apiClient.post(`/bookings`, appointment);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    const response = await apiClient.post(`/bookings/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAppointments = async () => {
  try {
    const response = await apiClient.get("/bookings");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
