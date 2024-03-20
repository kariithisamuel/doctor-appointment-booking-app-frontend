import { Booking } from "@/types";
import { Progress } from "./ui/progress";
import { BOOKING_STATUS } from "@/config/Booking-status-config";

type Props = {
  booking: Booking;
};

const BookingStatusHeader = ({ booking }: Props) => {
  const getExpectedAppointmentTime = () => {
    const created = new Date(booking.createdAt);

    created.setMinutes(
      created.getMinutes() + booking.appointment.appointmentTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getBookingStatusInfo = () => {
    return (
      BOOKING_STATUS.find((o) => o.value === booking.status) || BOOKING_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Booking  Status: {getBookingStatusInfo().label}</span>
        <span> Expected by: {getExpectedAppointmentTime()}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getBookingStatusInfo().progressValue}
      />
    </>
  );
};

export default BookingStatusHeader;
