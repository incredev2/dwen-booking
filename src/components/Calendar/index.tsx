"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  SlotPropGetter,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
// @ts-ignore
import enUS from "date-fns/locale/en-US";
import { SelectedSlot } from "@/types/type";
import { BookingPanel } from "../BookingPanel";
import { formatTime } from "@/utils/format";
import useAppointments from "@/hooks/useAppointments";
import { Modal } from "..";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

interface Props {
  availableSlot: EventParam[];
}

export interface EventParam extends Event {
  id: number;
  room_url: string;
  sid: string
}

const MEETING_SLUG = process.env.NEXT_PUBLIC_MEETING_SLUG as string;

const initialValue = {
  id: 0,
  meeting_slug: MEETING_SLUG,
  name: "",
  email: "",
  time_zone: "America/New_York",
  slot_date: "",
  slot_start_time: "",
};

export const CalendarView: React.FC<Props> = ({ availableSlot }) => {
  const [isOpenPanel, setIsOpenPanel] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [slots, setSlots] = useState<EventParam[]>(availableSlot);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot>(initialValue);
  const [selectedEvent, setSelectedEvent] = useState<EventParam | null>(null);
  const { events } = useAppointments();

  const closePanel = () => {
    setIsOpenPanel(false);
    setSelectedSlot(initialValue);
  };

  const handleSelectEvent = (e: any) => {
    const { id } = e;
    const event = events.find((event: any) => event.id === id);
    setSelectedEvent(event);
    setIsOpenModal(true);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    const date = slotInfo.start.toISOString().slice(0, 10);
    const startTime = formatTime(slotInfo.start);
    setSelectedSlot((prev) => ({
      ...prev,
      slot_date: date,
      slot_start_time: startTime,
    }));
    setIsOpenPanel(true);
  };

  const getSlotProp: SlotPropGetter = (date) => {
    const isAvailableSlot = slots?.some((slot) => {
      const slotDate = new Date(slot.start as Date);
      return (
        slotDate.getHours() === date.getHours() &&
        slotDate.getDate() === date.getDate() &&
        slotDate.getMonth() === date.getMonth() &&
        slotDate.getFullYear() === date.getFullYear()
      );
    });

    return {
      style: {
        backgroundColor: isAvailableSlot ? "#e6f3ff" : "#ffffff",
        cursor: isAvailableSlot ? "pointer" : "not-allowed",
      },
    };
  };

  return (
    <div className="flex text-black px-5 pt-5 bg-white">
      <div
        className={`flex-grow ${
          isOpenPanel ? "w-1/2" : "w-full"
        } transition-all duration-300`}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          defaultView="week"
          slotPropGetter={getSlotProp}
          onSelectEvent={(e) => handleSelectEvent(e)}
          onSelectSlot={handleSelectSlot}
          style={{ backgroundColor: "white", height: "calc(100vh - 84px)" }}
        />
      </div>
      {isOpenPanel && selectedSlot && (
        <div className="w-1/2 h-screen bg-gray-100 p-4 shadow-lg overflow-auto transition-transform duration-300">
          <BookingPanel
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            closePanel={closePanel}
            setSlots={setSlots}
          />
        </div>
      )}
      {isOpenModal && (
        <Modal selectedEvent={selectedEvent} setIsOpenModal={setIsOpenModal} />
      )}
    </div>
  );
};
