import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "src/redux/hooks"

const Home = () => {
  const navigate = useNavigate()
  const users = useAppSelector((state) => state?.users);
  // const { userAuth } = users;
  // const isAdmin = userAuth.isAdmin;

  // console.log('>>>>>  Isadmin ', userAuth.isAdmin);

  // useEffect (() => {
    
  //   if (isAdmin) {
  //     navigate(`/dashboard/authors`);
  //   } else if (!isAdmin) {
  //     navigate(`/`);
  //   } else {
  //     navigate("/")
  //   }
    
  // }, [isAdmin, navigate])

  return (
    <div>
      Home
    </div>
  )
}

export default Home
