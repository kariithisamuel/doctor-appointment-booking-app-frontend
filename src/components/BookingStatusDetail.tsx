import { Booking } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  booking: Booking;
};

const BookingStatusDetail = ({ booking }: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Confirmed to:</span>
        <span>{booking.appointmentDetails.name}</span>
        <span>
          {booking.appointmentDetails.addressLine1}, {booking.appointmentDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your bookings</span>
        <ul>
          {booking.cartItems.map((item) => (
            <li>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>ksh{(booking.totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default BookingStatusDetail;
