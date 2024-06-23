"use client";
import { useRouter } from "next/navigation";

type RedirectButtonProps = {
  children: React.ReactNode;
  action: "replace" | "push" | "refresh";
  to?: string;
  className?: string;
};
const RedirectButton = (props: RedirectButtonProps): JSX.Element => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (props.action === "push" && props.to) {
          router.push(props.to);
        } else if (props.action === "replace" && props.to) {
          router.replace(props.to);
        } else {
          router.refresh();
        }
      }}
      className={props.className}
    >
      {props.children}
    </button>
  );
};

export default RedirectButton;
