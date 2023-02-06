import React from "react";
import PrivateNav from "./Private/PrivateNav";
import PublicNav from "./Public/PublicNav";
import { useSelector } from "react-redux";

const Navigation = ()=> {
  const users = useSelector((state) => state?.users);
  const { userAuth } = users
  const isAdmin = userAuth?.isAdmin;
  return <>{userAuth  && isAdmin? null : userAuth ? <PrivateNav /> :<PublicNav />}</>;
};

export default Navigation;
