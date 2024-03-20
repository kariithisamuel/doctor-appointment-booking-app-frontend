import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/booking-status"
        className="flex bg-white items-center font-bold hover:text-blue-500"
      >
        Booking Status
      </Link>
      <Link
        to="/manage-appointment"
        className="flex bg-white items-center font-bold hover:text-blue-500"
      >
        My Appointment
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-blue-500"
      >
        My Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
