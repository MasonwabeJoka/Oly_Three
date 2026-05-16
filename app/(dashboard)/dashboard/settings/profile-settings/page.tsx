import ProfileSettingsForm from "../components/ProfileSettingsForm";
import { getProfileSettingsForCurrentUser } from "@/server/db/services/users";

export default async function ProfileSettingsPage() {
  const userProfile = await getProfileSettingsForCurrentUser();

  return (
    <ProfileSettingsForm
      initialUserProfile={userProfile}
    />
  );
}
