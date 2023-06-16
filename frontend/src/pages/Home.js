import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate()
  const users = useSelector((state) => state?.users);
  const { userAuth } = users;
  const isAdmin = userAuth.isAdmin;

  console.log('>>>>>  Isadmin ', userAuth.isAdmin);

  useEffect (() => {
    
    if (isAdmin) {
      navigate(`/dashboard/authors`);
    } else if (!isAdmin) {
      navigate(`/`);
    } else {
      navigate("/")
    }
    
  }, [isAdmin, navigate])

  return (
    <div>
      Home
    </div>
  )
}

export default Home
