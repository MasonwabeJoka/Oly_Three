import { getWorkOS, withAuth } from "@workos-inc/authkit-nextjs";
import ProfileSettingsForm from "../components/ProfileSettingsForm";

export default async function ProfileSettingsPage() {
  const { user } = await withAuth({ ensureSignedIn: true });
  const workos = getWorkOS();
  const freshUser = await workos.userManagement.getUser(user.id);

  return <ProfileSettingsForm initialUser={freshUser} />;
}
