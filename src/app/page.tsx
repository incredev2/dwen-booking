import { getAvailableSlots } from "@/api";
import { convertSlotsToEvents } from "@/utils/format";
import { CalendarView, Header } from "@/components";

export default async function Home() {
  const data = await getAvailableSlots({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    timezone: "America/New_York",
  });
  const availableSlot = convertSlotsToEvents(data.slots);

  return (
    <div>
      <Header />
      <CalendarView availableSlot={availableSlot} />
    </div>
  );
}
