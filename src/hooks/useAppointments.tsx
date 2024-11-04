import { getAppointments } from "@/api";
import { useEffect, useState } from "react";

const useAppointments = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true)
      const response = await getAppointments();
      const formattedEvents = response?.bookings.map((booking: any) => ({
        title: booking.name || "Meeting",
        start: new Date(booking.starts_at),
        end: new Date(new Date(booking.starts_at).getTime() + 60 * 60 * 1000),
        id: booking.id,
        room_url: booking.room_url,
        sid: booking.sid,
      }));
      setEvents(formattedEvents);
      setIsLoading(false)
    };
    fetchAppointments();
  }, [events]);
  return { events, isLoading, error };
};

export default useAppointments;
