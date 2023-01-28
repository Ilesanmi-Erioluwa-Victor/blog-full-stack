import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ():JSX.Element => {
    const [passwordFieldType, setPasswordFieldType] = useState<boolean>(false);

      const togglePasswordVisibility = () => {
    setPasswordFieldType(!passwordFieldType);
  };
  
  return (
    <div>
       <h2>Hello from sign up</h2>
    </div>
  )
}

export default Signup
