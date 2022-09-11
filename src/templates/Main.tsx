import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Meta } from "@/layouts/Meta";
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
      <Meta title={props.meta} description="CNotion"></Meta>
      {/* Desktop */}
      <div className="hidden md:flex w-full h-screen">
        <Sidebar />
        <div className="lg:w-8/12 py-4 mx-auto ml-auto">{props.children}</div>
      </div>
      {/* Mobile */}
      <div className="sm:block md:hidden">
        <Navbar />
        <div>{props.children}</div>
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
