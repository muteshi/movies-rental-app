import React, { useEffect, useState } from "react";
import auth from "../services/authService";

const useCurrentUser = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const currentUser = await auth.getCurrentUser();
    setUser(currentUser);
  };
  return {
    user,
  };
};

export default useCurrentUser;
