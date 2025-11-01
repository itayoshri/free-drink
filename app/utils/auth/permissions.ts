import { User } from "@/interfaces/db/auth";

//TODO: refactor
export interface PermissionData {
  [role: string]: {
    displayName: string;
    permissions: {
      [section: string]: {
        [key: string]: boolean;
      };
    };
  };
}

export default function hasPermission(
  user: User,
  permissionPath: string,
  permissionsData: PermissionData
) {
  const role = user ? user.role_key : "guest";
  const [section, key] = permissionPath.split(".");
  return permissionsData[role]?.permissions?.[section]?.[key];
}
