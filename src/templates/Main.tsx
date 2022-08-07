import Sidebar from "@/components/Sidebar";
import type { ReactNode } from "react";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}
    <Sidebar />
    <div className="relative md:ml-64">{props.children}</div>
  </div>
);

export { Main };