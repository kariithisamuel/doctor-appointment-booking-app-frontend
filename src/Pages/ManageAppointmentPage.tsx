import {
  useCreateMyAppointment,
  useGetMyAppointment,
  useGetMyAppointmentBookings,
 useUpdateMyAppointment,
} from "@/api/MyAppointmentApi";
import BookingItemCard from "@/components/BookingItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageAppointmentForm from "@/forms/manage-appointment-form/ManageAppointmentForm";

const ManageAppointmentPage = () => {
  const { createAppointment, isLoading: isCreateLoading } =
    useCreateMyAppointment();
  
  
  const { appointment } = useGetMyAppointment();
  const { updateAppointment, isLoading: isUpdateLoading } =
   useUpdateMyAppointment();

  const { bookings } = useGetMyAppointmentBookings();

  const isEditing = !!appointment;

  return (
    <Tabs defaultValue="bookings">
      <TabsList>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="manage-appointment">Manage Appointment</TabsTrigger>
      </TabsList>
      <TabsContent
        value="bookings"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{bookings?.length} active bookings</h2>
        {bookings?.map((booking) => (
          <BookingItemCard booking={booking} />
        ))}
      </TabsContent>
      <TabsContent value="manage-appointment">
        <ManageAppointmentForm
          appointment={appointment}
          onSave={isEditing ? updateAppointment : createAppointment}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageAppointmentPage;
