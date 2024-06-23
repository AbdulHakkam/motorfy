import { RegisterForm } from "@/components/forms/register";

const registerPage = () => {
  return (
    <div className="bg-slate-100 flex min-h-[calc(100vh-65px)]">
      <div className="w-[400px] mx-auto my-auto bg-white p-5 rounded-[10px] flex flex-col">
        <p className="mx-auto text-xl mb-5 font-bold">REGISTER</p>
        <RegisterForm />
      </div>
    </div>
  );
};
export default registerPage;
