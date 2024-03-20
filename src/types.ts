export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type SpecialityItem = {
  _id: string;
  name: string;
  price: number;
};

export type Appointment = {
  _id: string;
  user: string;
  appointmentName: string;
  city: string;
  country: string;
  appointmentFee: number;
  appointmentTime: number;
  specializations: string[];
  specialityItems: SpecialityItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type BookingStatus =
  | "requested"
  | "paid"
  | "inProgress"
  | "completed"
  | "cancelled";

export type Booking = {
  _id: string;
  appointment: Appointment;
  user: User;
  cartItems: {
    specialityItemId: string;
    name: string;
    quantity: string;
  }[];
 appointmentDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
  appointmentId: string;
};

export type AppointmentSearchResponse = {
  data: Appointment[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
