import { Booking, BookingStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BOOKING_STATUS } from "@/config/Booking-status-config";
import { useUpdateMyAppointmentBooking } from "@/api/MyAppointmentApi";
import { useEffect, useState } from "react";

type Props = {
  booking: Booking;
};

const BookingItemCard = ({ booking }: Props) => {
  const { updateAppointmentStatus, isLoading } = useUpdateMyAppointmentBooking();
  const [status, setStatus] = useState<BookingStatus>(booking.status);

  useEffect(() => {
    setStatus(booking.status);
  }, [booking.status]);

  const handleStatusChange = async (newStatus: BookingStatus) => {
    await updateAppointmentStatus({
      bookingId: booking._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const bookingDateTime = new Date(booking.createdAt);

    const hours = bookingDateTime.getHours();
    const minutes = bookingDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Patient Name:
            <span className="ml-2 font-normal">
              {booking.appointmentDetails.name}
            </span>
          </div>
          <div>
            Location:
            <span className="ml-2 font-normal">
              {booking.appointmentDetails.addressLine1}, {booking.appointmentDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              ksh{(booking.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {booking.cartItems.map((cartItem) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this appointment?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as BookingStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {BOOKING_STATUS.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItemCard;
