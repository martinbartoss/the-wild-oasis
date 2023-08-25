import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { singup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (User) => {
      console.log(User);
      toast.success(
        "Account successfully created! Please verify the new account from the user's email adress"
      );
    },
  });

  return { signup, isLoading };
}
