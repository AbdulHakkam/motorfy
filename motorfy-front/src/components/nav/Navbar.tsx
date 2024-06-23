import { cookies } from "next/headers";
import LoginButton from "../buttons/Login.button";
import { User } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const Navbar = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <nav className="flex p-3 px-4 bg-mainRed fixed z-20 w-[100%] top-0">
      <Link href="/">
        <p className=" font-bold text-white text-xl">MOTORFY</p>
      </Link>
      {token ? (
        <Link href="/profile/posts" className="ml-auto">
          <User size={25} color="white" />
        </Link>
      ) : (
        <LoginButton />
      )}
    </nav>
  );
};
export default Navbar;
