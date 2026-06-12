import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api.js";


const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  // HIGHLIGHT: Fixed typo, return value is now 'authUser' (camelCase) to match usage in App.jsx
  return { isLoading: authUser.isLoading, authUser: authUser.data?.user || null };
};

export default useAuthUser;