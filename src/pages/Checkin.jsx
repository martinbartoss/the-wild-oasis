import { useNavigate } from "react-router-dom";
import CheckinBooking from "../features/check-in-out/CheckinBooking";
function Checkin() {
  const navigate = useNavigate();
  const moveBack = () => navigate(-1);

  return <CheckinBooking moveBack={moveBack} />;
}

export default Checkin;
