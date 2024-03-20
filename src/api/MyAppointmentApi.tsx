import { Booking, Appointment } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyAppointment = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyAppointmentRequest = async (): Promise<Appointment> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/appointment`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get appointment");
    }
    return response.json();
  };

  const { data: appointment, isLoading } = useQuery(
    "fetchMyAppointment",
    getMyAppointmentRequest
  );

  return { appointment, isLoading };
};

export const useCreateMyAppointment = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyAppointmentRequest = async (
    appointmentFormData: FormData
  ): Promise<Appointment> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/appointment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: appointmentFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create appointment");
    }

    return response.json();
  };

  const {
    mutate: createAppointment,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyAppointmentRequest);

  if (isSuccess) {
    toast.success("Appointment created!");
  }

  if (error) {
    toast.error("Unable to update appointment");
  }

  return { createAppointment, isLoading };
};

export const useUpdateMyAppointment = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateAppointmentRequest = async (
    appointmentFormData: FormData
  ): Promise<Appointment> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/appointment`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: appointmentFormData,
    });

    if (!response) {
      throw new Error("Failed to update appointment");
    }

    return response.json();
  };

  const {
    mutate: updateAppointment,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateAppointmentRequest);

  if (isSuccess) {
    toast.success("Appointment Updated");
  }

  if (error) {
    toast.error("Unable to update Appointment");
  }

  return { updateAppointment, isLoading };
};

export const useGetMyAppointmentBookings = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyAppointmentBookingsRequest = async (): Promise<Booking[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/appointment/booking`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return response.json();
  };

  const { data: bookings, isLoading } = useQuery(
    "fetchMyAppointmentBookings",
    getMyAppointmentBookingsRequest
  );

  return { bookings, isLoading };
};

type UpdateBookingStatusRequest = {
  bookingId: string;
  status: string;
};

export const useUpdateMyAppointmentBooking = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyAppointmentBooking = async (
    updateStatusBookingRequest: UpdateBookingStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/appointment/booking/${updateStatusBookingRequest.bookingId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusBookingRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateAppointmentStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyAppointmentBooking);

  if (isSuccess) {
    toast.success("booking updated");
  }

  if (isError) {
    toast.error("Unable to update booking");
    reset();
  }

  return { updateAppointmentStatus, isLoading };
};
