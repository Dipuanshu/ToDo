/** @format */

import React, { useEffect } from "react";
import { AiOutlineCiCircle } from "react-icons/ai";
import { MdOutlineDangerous } from "react-icons/md";
import WithAlert from "./WithAlert";
import WithUser from "./WithUser";
import WithProvider from "./WithProvider";
import { AlertContext } from "./Contexts";

function Alert({ alert, RemoveAlert }) {
  useEffect(() => {
    if (alert) {
      const TimeOut = setTimeout(function () {
        //SetTimeout ek function leta hai aur time leta hai milisecond mai 3*1000 mtlb 3sec
        RemoveAlert();
      }, 5 * 1000);
      return function () {
        clearTimeout(TimeOut);
      };
    }
  });
  if (!alert) {
    return;
  }

  //ek obj milega usse nikal lenge msg,type
  const { type, message } = alert;
  //type ka mtlb error,sucess,waring
  let colour;
  let Icon;

  if (type == "sucess") {
    colour = "bg-green-400";
    Icon = <AiOutlineCiCircle />;
  } else if (type == "error") {
    colour = "bg-red-400";
    Icon = <MdOutlineDangerous />;
  }
  console.log("type", type);
  console.log("colour", { colour });

  return (
    <>
      <div className="px-4 flex justify-center items-center">
        <div
          role="alert"
          id="alert"
          className="transition duration-150 ease-in-out w-full lg:w-11/12 mx-auto bg-white dark:bg-gray-800 shadow rounded flex flex-col py-4 md:py-0 items-center md:flex-row justify-between"
        >
          <div className="flex flex-col items-center md:flex-row">
            <div
              className={
                "mr-3 p-4 rounded md:rounded-tr-none md:rounded-br-none text-white" +
                { colour }
              }
            >
              {Icon}
            </div>
            <p className="mr-2 text-base font-bold text-red-500 mt-2 md:my-0">
              {type}
            </p>
            <div className="h-1 w-1 bg-gray-300 dark:bg-gray-700 rounded-full mr-2 hidden xl:block"></div>
            <p className="text-sm lg:text-base dark:text-gray-400 text-gray-600 lg:pt-1 xl:pt-0 sm:mb-0 mb-2 text-center sm:text-left">
              {message}
            </p>
          </div>
          <div className="flex xl:items-center lg:items-center sm:justify-end justify-center pr-4">
            <button
              onClick={RemoveAlert}
              className="focus:outline-none focus:text-gray-400 hover:text-gray-400 text-sm cursor-pointer text-gray-600 dark:text-gray-400"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default WithProvider(AlertContext)(Alert);
