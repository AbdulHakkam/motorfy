import { RedirectType, redirect } from "next/navigation";

const ProfilePage = () => {
  redirect("/profile/posts", RedirectType.push);
  return <div></div>;
};
export default ProfilePage;
