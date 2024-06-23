import {
  UserCircle,
  Gear,
  SignOut,
  SquaresFour,
} from "@phosphor-icons/react/dist/ssr";

const ProfileNavbar = () => {
  const routes = [
    {
      name: "My Posts",
      href: "/profile/posts",
      icon: () => <SquaresFour weight="fill" />,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: () => <UserCircle weight="fill" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: () => <Gear weight="fill" />,
    },
  ];
  return (
    <div className=" bg-slate-100 min-h-custom w-[180px] flex flex-col p-[11px] text-lg justify-between">
      <div className="flex flex-col">
        {routes.map((route, index) => {
          return (
            <div
              className="flex items-center space-x-2 p-3 rounded-sm hover:bg-mainRed hover:text-white cursor-pointer w-full"
              key={index}
            >
              {route.icon()}
              <p className=" text-sm">{route.name}</p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center space-x-2 p-3 rounded-sm hover:bg-mainRed hover:text-white cursor-pointer w-full">
        <SignOut />
        <p className=" text-sm">Log out</p>
      </div>
    </div>
  );
};

export default ProfileNavbar;
