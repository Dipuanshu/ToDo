import React, { useEffect, useState } from "react";
import { UserContext } from "./Contexts";
import Loading from "./Loading";
import axios from "axios";

function UserProvider({ children }) {
  const [user, setUser] = useState();
  console.log("userProvide",user);
  const [loading, setLoadng] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoadng(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setLoadng(false);
        });
    } else {
      setLoadng(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <UserContext.Provider value={{ isLoggedIn: !!token, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;


