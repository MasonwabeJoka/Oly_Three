import { useQuery } from "@tanstack/react-query";
import { getProfileSettingsForCurrentUser } from "@/server/db/services/users";

export const useProfileSettings = () => {
  return useQuery({
    queryKey: ["profile-settings"],
    queryFn: getProfileSettingsForCurrentUser,
  });
};
