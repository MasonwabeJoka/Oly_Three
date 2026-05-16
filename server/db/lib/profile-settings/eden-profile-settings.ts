
import { ProfilesApp } from "@/server/db/routes/users/profile-settings/route";
import { treaty } from "@elysia/eden";


export const eden =
  treaty<ProfilesApp>(
    process.env.NEXT_PUBLIC_API_URL!
  );
