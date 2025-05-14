/** @format */

import React, { useContext } from "react";
import { AlertContext } from "./Contexts";
function WithAlert(IncomingComponent) {
  //isme incoming mai wo componet aayga jha HOC use hoga
  console.log("incoming coponent ", IncomingComponent);
  function OutgoingComponent(props) {
    const { alert, setAlert, RemoveAlert } = useContext(AlertContext); //alert context mai alert,setalert,Removealert sb kuch hoga
    return (
      <IncomingComponent
        {...props}
        alert={alert}
        setAlert={setAlert}
        RemoveAlert={RemoveAlert}
      />
    );
  }

  return OutgoingComponent;
}
export default WithAlert;
