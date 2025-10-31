import { User } from "@/interfaces/db/auth";

export default function hasPermission(
  user: User,
  permissionPath: string,
  permissionsData: Record<string, any>
) {
  const role = user.role_key;
  const [section, key] = permissionPath.split(".");
  return permissionsData[role]?.permissions?.[section]?.[key];
}
