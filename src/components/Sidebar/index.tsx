import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ThemeSwitch } from "../ThemeSwitch";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  const disconnect = useDisconnect();
  const address = useAddress();

  const onLogout = () => {
    sessionStorage.removeItem("isWalletConnected");
    sessionStorage.removeItem("token");
    disconnect();
  };

  return (
    <nav
      className="md:left-0 md:block md:fixed md:h-screen md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative z-10 py-4 px-8 dark:bg-black-700 dark:text-white dark:border-r"
      style={{ width: "248px", maxWidth: "248px" }}
    >
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}
        <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* Brand */}
        <Link href="/">
          <a
            href="#pablo"
            className="md:block text-left md:pb-2 dark:text-white mr-0 inline-block whitespace-nowrap text-4xl uppercase font-bold p-4 px-2"
          >
            CNotion
          </a>
        </Link>
        {/* Collapse */}
        <div
          className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }
        >
          {/* Collapse header */}
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200 dark:text-white">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link href="/">
                  <a
                    href="#pablo"
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  >
                    CNotion
                  </a>
                </Link>
              </div>
              <div className="w-6/12 flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Form */}
          <form className="mt-6 mb-4 md:hidden">
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Search"
                className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
              />
            </div>
          </form>

          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Navigation */}

          <ul className="md:flex-col md:min-w-full flex flex-col list-none dark:text-white">
            {address && (
              <>
                <li className="items-center" title="Portfolio">
                  <Link href="/dashboard/portfolio">
                    <a
                      href="/dashboard/portfolio"
                      className={"text-lg uppercase py-3 font-bold block "}
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-lg " +
                          (router.pathname.indexOf("/dashboard/portfolio") !==
                          -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>{" "}
                      Portfolio
                    </a>
                  </Link>
                </li>
                <li className="items-center" title="Transactions">
                  <Link href="/dashboard/transactions">
                    <a
                      href="/dashboard/transactions"
                      className={"text-lg uppercase py-3 font-bold block "}
                    >
                      <i className={"fas fa-tools mr-2 text-sm "}></i>{" "}
                      Transactions
                    </a>
                  </Link>
                </li>
                <li className="items-center" title="Wallets">
                  <Link href="/dashboard/wallets">
                    <a
                      href="/dashboard/wallets"
                      className={"text-lg uppercase py-3 font-bold block "}
                    >
                      <i className={"fas fa-tools mr-2 text-sm "}></i> Wallets
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="md:flex-col mt-auto ml-2">
            <li className="items-center">
              <ThemeSwitch />
            </li>
            {address && (
              <li className="items-center">
                <div
                  className="text-lg uppercase font-bold block cursor-pointer"
                  onClick={() => {
                    onLogout();
                  }}
                >
                  Logout
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
