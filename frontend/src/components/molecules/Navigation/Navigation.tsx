import React from "react";
import { useAppSelector } from "src/redux/hooks";
import { AccountMenu } from "./Menu/Menu";
// import PrivateNav from "./Private/PrivateNav";
// import PublicNav from "./Public/PublicNav";


const Navigation = () => {
  const userState = useAppSelector((state) => state?.users);

  const { user } = userState;

  const isAdmin = user?.isAdmin;
  return <>{user  && isAdmin ? null : user ? <AccountMenu userProp={user}/> : null}</>;
};

export default Navigation;
