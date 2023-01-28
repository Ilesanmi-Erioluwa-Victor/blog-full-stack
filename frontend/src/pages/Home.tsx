import React from 'react'
import { useLocation } from "react-router-dom";
const Home = () => {
     const loaction = useLocation();
 console.log(loaction);

  return (
    <div>
      Home
    </div>
  )
}

export default Home
