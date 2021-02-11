import React, { useEffect, useState } from "react";
import auth from "../services/authService";

const useCurrentUser = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, [auth]);

  //if user object is null set to an empty object
  //   const currentUser = user === null ? {} : user;

  return {
    user,
  };
};

export default useCurrentUser;
