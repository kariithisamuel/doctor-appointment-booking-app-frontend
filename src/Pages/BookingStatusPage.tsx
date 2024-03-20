import { useGetMyBookings } from "@/api/BookingApi";
import BookingStatusDetail from "@/components/BookingStatusDetail";
import BookingStatusHeader from "@/components/bookingStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const BookingStatusPage = () => {
  const { bookings, isLoading } = useGetMyBookings();

  if (isLoading) {
    return "Loading...";
  }

  if (!bookings || bookings.length === 0) {
    return "No bookings found";
  }

  return (
    <div className="space-y-10">
      {bookings.map((booking) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <BookingStatusHeader booking={booking} />
          <div className="grid gap-10 md:grid-cols-2">
            <BookingStatusDetail booking={booking} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={booking.appointment.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingStatusPage;
