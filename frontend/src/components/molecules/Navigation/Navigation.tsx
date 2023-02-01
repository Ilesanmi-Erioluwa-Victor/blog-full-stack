import React from "react";
import { useAppSelector } from "src/redux/hooks";
import { RootState } from "src/redux/store";
import PrivateNav from "./Private/PrivateNav";
import PublicNav from "./Public/PublicNav";

const Navigation = (): JSX.Element => {
  const users = useAppSelector((state: RootState) => state.users);
  const { userAuth } = users;
  // const isAdmin = userAuth?.isAdmin;
  return (
    <>
      {!userAuth ? (
        <PublicNav />
      ) : userAuth ? (
        <PrivateNav />
      ) : ""
    }
    </>
  );
};

export default Navigation;
