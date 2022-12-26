import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

export const useCheckUserStatus = () => {
  const [userLoggedin, setUserLoggedin] = useState({
    status: "loading",
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserLoggedin({
          ...userLoggedin,
          uid,
          loggedin: true,
          status: "fullfiled",
        });
      } else {
        setUserLoggedin({
          ...userLoggedin,
          loggedin: false,
          status: "fullfiled",
        });
      }
    });
  }, [userLoggedin.dashboard]);
  return [userLoggedin, setUserLoggedin];
};
