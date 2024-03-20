import { Appointment } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  appointment: Appointment;
};

const SearchResultCard = ({ appointment }: Props) => {
  return (
    <Link
      to={`/detail/${appointment._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={appointment.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {appointment.appointmentName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {appointment.specializations.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < appointment.specializations.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {appointment.appointmentTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Appointment from ksh{(appointment.appointmentFee / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
