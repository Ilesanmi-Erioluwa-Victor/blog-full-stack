import React from "react";
import { useAppSelector } from "src/redux/hooks";
import PrivateNav from "./Private/PrivateNav";
import PublicNav from "./Public/PublicNav";

const Navigation = () => {
  const userState = useAppSelector((state) => state?.users);

  const { user } = userState;

  const isAdmin = user?.isAdmin;
  return <>{user  && isAdmin? null : user ? <PrivateNav /> :<PublicNav />}</>;
};

export default Navigation;
