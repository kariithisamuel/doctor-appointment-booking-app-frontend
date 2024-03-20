import { BookingStatus } from "@/types";

type BookingStatusInfo = {
  label: string;
  value: BookingStatus;
  progressValue: number;
};

export const BOOKING_STATUS: BookingStatusInfo[] = [
  { label: "Requested", value: "requested", progressValue: 0 },
  {
    label: "Awaiting Confirmation",
    value: "paid",
    progressValue: 25,
  },
  { label: "In Progress", value: "inProgress", progressValue: 50 },
  { label: "Completed", value: "completed", progressValue: 75 },
  { label: "Cancelled", value: "cancelled", progressValue: 100 },
];
