"use client";
import { logout } from "@/requests/auth";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <button className="ml-auto">
      <SignOut
        size={25}
        onClick={() => {
          logout().then(() => router.refresh());
        }}
      />
    </button>
  );
};

export default LogoutButton;
