/** @format */

import React from "react";
import { ImSpinner7 } from "react-icons/im";
function Loading() {
  return (
    <div className="text-blue-500 text-5xl flex items-center justify-center grow h-screen">
      <ImSpinner7 className="animate-spin" />
    </div>
  );
}
export default Loading;
