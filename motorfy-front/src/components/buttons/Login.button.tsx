"use client";
import { SignIn } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  return (
    <button className="ml-auto">
      <SignIn
        size={25}
        onClick={() => router.push("/auth/login")}
        color="white"
      />
    </button>
  );
};

export default LoginButton;
