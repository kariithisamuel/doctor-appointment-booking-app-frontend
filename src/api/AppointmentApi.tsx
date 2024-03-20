import { SearchState } from "@/Pages/SearchPage";
import { Appointment, AppointmentSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAppointment = (appointmentId?: string) => {
  const getAppointmentByIdRequest = async (): Promise<Appointment> => {
    const response = await fetch(
      `${API_BASE_URL}/api/appointment/${appointmentId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get Appointment");
    }

    return response.json();
  };

  const { data: appointment, isLoading } = useQuery(
    "fetchAppointment",
    getAppointmentByIdRequest,
    {
      enabled: !!appointmentId,
    }
  );

  return { appointment, isLoading };
};

export const useSearchAppointments = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<AppointmentSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedSpecializations", searchState.selectedSpecializations.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/appointment/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get Appointment");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchAppointments", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

