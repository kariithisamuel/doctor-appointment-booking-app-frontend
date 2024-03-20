import { Booking } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyBookings = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyBookingsRequest = async (): Promise<Booking[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/booking`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get Bookings");
    }

    return response.json();
  };

  const { data: bookings, isLoading } = useQuery(
    "fetchMyBookings",
    getMyBookingsRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { bookings, isLoading };
};

type CheckoutSessionRequest = {
  cartItems: {
    specialityItemId: string;
    name: string;
    quantity: string;
  }[];

  appointmentDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  appointmentId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/booking/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
