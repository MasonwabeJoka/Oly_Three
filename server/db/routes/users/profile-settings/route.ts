// Moved to db/services/users.ts — Elysia route removed in favour of direct service calls.
// This file is kept for backwards compatibility.
export { getProfileSettingsForCurrentUser } from "@/server/db/services/users";
export type { ProfileSettingsDto } from "@/server/db/services/users";
