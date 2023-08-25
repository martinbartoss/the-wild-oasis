import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
  // this allows us to invalidate data after deletion and this automaticly refetches data
  const queryClient = useQueryClient();

  // deleting and updating data afterwards
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}

// Once you have 2 or more hooks, it is a very great idea to make your own custom hook
