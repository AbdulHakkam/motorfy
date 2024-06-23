import Link from "next/link";

const PostPage = () => {
  return (
    <div className="min-h-custom mt-[50px]">
      <div className="mt-5">
        <Link
          className=" p-3 bg-mainRed text-white rounded-sm ml-2"
          href="/profile/posts/new"
        >
          New Post
        </Link>
      </div>
    </div>
  );
};
export default PostPage;
