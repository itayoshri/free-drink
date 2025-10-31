import { User } from "@/interfaces/db/auth";

export default function hasPermission(
  user: User,
  permissionPath: string,
  permissionsData: Record<string, string> | object
) {
  const role = user ? user.role_key : "guest";
  const [section, key] = permissionPath.split(".");
  return permissionsData[role]?.permissions?.[section]?.[key];
}
