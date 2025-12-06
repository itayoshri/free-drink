import * as Icons from "@/components/Icons";

export type Route = {
  text?: string;
  icon: keyof typeof Icons;
  route?: string;
  onClick?(): unknown;
};

export const routes = [
  { text: "שובר למשקה", icon: "Drink", route: "/getpoints" },
  { text: "ממשק ניהול", icon: "SupervisorAccount", route: "/refill" },
] as Route[];
