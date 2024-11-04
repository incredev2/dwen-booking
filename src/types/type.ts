export type MemberAvailability = {
  [memberName: string]: number;
};

export type Slot = {
  start_time: string;
  is_available: boolean;
  member_availability: MemberAvailability;
  end_time: string;
  count: number;
};

export type AvailableSlots = {
  date: string;
  day: number;
  slots: {
    [timeRange: string]: Slot;
  };
};

export type SelectedSlot = {
  id: number;
  meeting_slug: string;
  name: string;
  email: string;
  time_zone: string;
  slot_date: string;
  slot_start_time: string;
};
