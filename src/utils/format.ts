import { AvailableSlots } from "@/types/type";

export function convertSlotsToEvents(slotsData: AvailableSlots[]) {
  let events: any = [];
  let eventId = 1;

  slotsData.forEach((slotItem) => {
    const dateParts = slotItem.date.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are 0-based in JavaScript Date
    const day = parseInt(dateParts[2]);

    for (const [slotTime, slotDetails] of Object.entries(slotItem.slots)) {
      if (slotDetails.is_available) {
        const startParts = slotDetails.start_time.split(/[: ]/);
        const endParts = slotDetails.end_time.split(/[: ]/);

        const startHour =
          parseInt(startParts[0]) +
          (startParts[2] === "PM" && startParts[0] !== "12" ? 12 : 0);
        const startMinute = parseInt(startParts[1]);
        const endHour =
          parseInt(endParts[0]) +
          (endParts[2] === "PM" && endParts[0] !== "12" ? 12 : 0);
        const endMinute = parseInt(endParts[1]);

        const start = new Date(year, month, day, startHour, startMinute);
        const end = new Date(year, month, day, endHour, endMinute);

        events.push({
          id: eventId++,
          title: "Available Slot",
          start: start,
          end: end,
        });
      }
    }
  });

  return events;
}

export function formatTime(date?: Date) {
  if (!date) return "";
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert hour "0" to "12" for 12-hour format
  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  return formattedTime;
}
