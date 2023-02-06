import React from "react";
import { useDispatch,useSelector } from "react-redux";



const Footer = () => {
    const users = useSelector((state) => state?.users);
  const { userAuth } = users;
  return (
    <>
    {/* {userAuth && <h2>Hello from user</h2>} */}
     footer
    </>
  )
}

export default Footer
