"use client";
import { AUTH_SERVER_URL } from "@/app/account/Form";
import Button from "@/components/button";
import DataTextbox from "@/components/UI/DataTextbox";
import Dropdown from "@/components/UI/Dropdown";
import TextBlock from "@/components/UI/Text";
import TitledComponent from "@/components/UI/Titled";
import { useAuth } from "@/context/auth";
import { User } from "@/interfaces/db/auth";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";

const TITLE = "מחולל קודי הזמנה";
type GeneratedInvitation = {
  invitationToken: string;
  role: string;
};

export default function InvitationGenerator() {
  const { rolesMap } = useAuth();
  const options = useMemo(() => {
    return Object.keys(rolesMap).map((key) => {
      return { label: rolesMap[key].displayName, value: key };
    });
  }, [rolesMap]);

  const [selectedRole, setSelectedRole] = useState(options[0]);
  const [loading, setLoading] = useState(false);
  const [generatedInvitation, setTokenState] =
    useState<null | GeneratedInvitation>(null);
  const generateInvitation = useCallback((role: string) => {
    setLoading(true);
    axios
      .post(
        `${AUTH_SERVER_URL}/invitation/generate`,
        { role },
        { withCredentials: true }
      )
      .then((res) => {
        const { invitationToken, role } = res.data.data;
        setTokenState({ invitationToken, role });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full gap-form-2">
      <TextBlock subTitle={TITLE} className="flex flex-col items-center" />
      <div className="flex flex-col gap-form w-full">
        <TitledComponent title="רמת משתמש">
          <Dropdown
            selected={selectedRole}
            onChange={(newRole) => setSelectedRole(newRole)}
            options={options}
          />
        </TitledComponent>
        <Button
          onClick={() => generateInvitation(selectedRole.value)}
          type="submit"
          disabled={loading}
        >
          יצירת קוד גישה
        </Button>
      </div>
      <div>
        {generatedInvitation ? (
          <TitledComponent title="הקוד שנוצר:">
            <DataTextbox
              data={generatedInvitation.invitationToken}
              key={generatedInvitation.invitationToken}
            />
          </TitledComponent>
        ) : null}
      </div>
    </div>
  );
}
