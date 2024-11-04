"use client";
import { addAppointment } from "@/api";
import React, { Dispatch, SetStateAction } from "react";
import { SelectedSlot } from "@/types/type";
import { EventParam } from "../Calendar";
import { TextField } from "..";
import { Button } from "..";

interface BookingFormProps {
  selectedSlot: SelectedSlot;
  setSelectedSlot: Dispatch<SetStateAction<SelectedSlot>>;
  closePanel: () => void;
  setSlots: Dispatch<SetStateAction<EventParam[]>>;
}

export const BookingPanel: React.FC<BookingFormProps> = ({
  selectedSlot,
  setSelectedSlot,
  closePanel,
  setSlots,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedSlot((prev: SelectedSlot) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await addAppointment(selectedSlot);
    console.log("ccccccccc", response);
    if (response) {
      setSlots((prev) => prev.filter((slot) => slot?.id !== selectedSlot.id));
      closePanel();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Book an Appointment</h2>
      {selectedSlot && (
        <p>
          Selected Date and Time:{" "}
          <strong>{selectedSlot.slot_start_time}</strong>
        </p>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col">
          <TextField
            label="Name"
            name="name"
            value={selectedSlot.name}
            onChange={handleInputChange}
            type="text"
            required
          />
        </div>
        <div className="flex flex-col">
          <TextField
            name="email"
            label="Email"
            value={selectedSlot.email}
            onChange={handleInputChange}
            type="email"
            required
          />
        </div>
        <div className="flex gap-3">
          <Button type="submit" variant="primary">
            Confirm Booking
          </Button>
          <Button type="button" handleClick={closePanel} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
