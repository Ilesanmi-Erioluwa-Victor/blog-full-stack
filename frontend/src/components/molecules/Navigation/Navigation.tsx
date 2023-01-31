import React from "react";
// import { useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PublicNav from "./Public/PublicNav";
// import PrivateNav from "./Private/PrivateNav";
// import AdminNavigation from "./Admin/AdminNav";


const Navigation = (): JSX.Element => {
  const location = useLocation();
  console.log(location);
  return (
   <>
  
   <PublicNav />


   </>
  );
};

export default Navigation;
