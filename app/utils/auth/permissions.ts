import { User } from "@/interfaces/db/auth";
import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
//TODO: refactor
export interface PermissionData {
  [role: string]: {
    displayName: string;
    permissions: Permissions;
  };
}

type Permissions = {
  [section: string]: any;
};

interface JWTPayload {
  sub: string;
  phone_number: string;
  role: string;
}

export default function hasPermission(
  user: User | { role_key: string },
  permissionPath: string,
  permissionsData: PermissionData
) {
  const role = user ? user.role_key : "guest";

  const parts = permissionPath.split(".");
  const section = parts[0];
  const key = parts[1];

  const rolePermissions = permissionsData[role]?.permissions;

  if (!rolePermissions) return undefined;

  if (key) {
    return rolePermissions[section]?.[key];
  } else {
    return rolePermissions[section];
  }
}

const AUTH_SERVER_URL = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;
let cachedPermissions: PermissionData = {};
let lastFetched = 0;
const CACHE_TTL = 1000 * 60 * 30;

export async function getAppPermissions() {
  const now = Date.now();

  if (cachedPermissions && now - lastFetched < CACHE_TTL) {
    return cachedPermissions;
  }

  const { roles } = (await axios.get(`${AUTH_SERVER_URL}/invitation/roles`))
    .data.data;
  cachedPermissions = roles;
  lastFetched = now;

  return roles;
}

export function getUserPermissions(token: string): JWTPayload {
  const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, "\n");

  try {
    const payload = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    return payload as JWTPayload;
  } catch {
    return { role: "guest" } as JWTPayload;
  }
}

export function getAcessTokenFromRequest(req: NextRequest): string | null {
  const accessToken = req.cookies.get("access_token")?.value;
  if (accessToken) {
    return accessToken;
  }

  return null;
}
