import Sidebar from "@/components/Sidebar";
import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type IMainProps = {
  meta: string;
  children: ReactNode;
};

export const Main = (props: IMainProps) => {
  return (
    <div className="w-full px-1 text-gray-700 antialiased dark:bg-zinc-700 dark:text-white">
      <NextSeo title={props.meta}></NextSeo>
      <div className="flex w-full h-screen">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <div className="w-10/12">{props.children}</div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};
