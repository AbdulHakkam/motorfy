import { LoginForm } from "@/components/forms/login";
import Link from "next/link";
const loginPage = () => {
  return (
    <div className="bg-slate-100 flex flex-col justify-center items-center min-h-[calc(100vh-65px)]">
      <div className="w-[400px] bg-white p-5 rounded-[10px] flex flex-col">
        <p className="mx-auto text-xl mb-5 font-bold">LOG IN</p>
        <LoginForm />
      </div>
      <div className="flex">
        <p className=" text-black">Dont have an account yet? Register </p>
        <Link href="/auth/register">
          <p className=" font-bold">&nbsp;here</p>
        </Link>
      </div>
    </div>
  );
};

export default loginPage;
