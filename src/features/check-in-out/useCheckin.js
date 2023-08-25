import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      // on success takes the data returned from the function
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true }); // this will deactive all the currently active queries on the page
      navigate("/");
    },
    onError: () => toast.error("There was an error while checkin in"),
  });
  return { checkin, isCheckingIn };
}
