import { User } from "@/interfaces/db/auth";

export default function hasPermission(
  user: User,
  permissionPath: string,
  permissionsData: Record<string, Record<string, string | boolean>>
): boolean | string {
  const role = user.role_key;
  console.log(permissionsData[role]);
  return permissionsData[role];
}
