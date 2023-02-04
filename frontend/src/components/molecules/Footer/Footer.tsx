import React from "react";
import { useAppSelector } from "src/redux/hooks";
import { RootState } from "src/redux/store";


const Footer = () => {
    const users = useAppSelector((state: RootState) => state.users);
  const { userAuth } = users;
  return (
    <>
    {/* {userAuth && <h2>Hello from user</h2>} */}
     footer
    </>
  )
}

export default Footer
