"use client";
import Button from "@/components/button";
import Dropdown from "@/components/UI/Dropdown";
import TextBlock from "@/components/UI/Text";
import TitledComponent from "@/components/UI/Titled";
import { useAuth } from "@/context/auth";
import { useMemo, useState } from "react";

const TITLE = "מחולל קודי הזמנה";

export default function InvitationGenerator() {
  const { rolesMap } = useAuth();
  const options = useMemo(() => {
    return Object.keys(rolesMap).map((key) => {
      return { label: rolesMap[key].displayName, value: key };
    });
  }, [rolesMap]);

  const [selectedRole, setSelectedRole] = useState(options[0]);
  return (
    <div className="flex flex-col w-full gap-form">
      <TextBlock subTitle={TITLE} className="flex flex-col items-center" />

      <div className="flex flex-col gap-form w-full">
        <TitledComponent title="רמת משתמש">
          <Dropdown
            selected={selectedRole}
            onChange={(newRole) => setSelectedRole(newRole)}
            options={options}
          />
        </TitledComponent>
        <Button type="submit">יצירת קוד גישה</Button>
      </div>
    </div>
  );
}
