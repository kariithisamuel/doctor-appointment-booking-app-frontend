import { Appointment } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  appointment: Appointment;
};

const AppointmentInfo = ({ appointment }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {appointment.appointmentName}
        </CardTitle>
        <CardDescription>
          {appointment.city}, {appointment.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {appointment.specializations.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < appointment.specializations.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default AppointmentInfo;
