import React, { useState } from "react";
import {
  EnvelopeIcon,
  EyeSlashIcon,
  EyeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorImg from "src/assets/authentication/errorpage.svg" 
import { Button, Input } from "src/components/atoms";
import { Icon } from "src/utils";

export interface loginUser {
  password : string;
  email : string;

}

const Login = ():JSX.Element => {
   const [passwordFieldType, setPasswordFieldType] = useState<boolean>(false);
  const [loginUser, setLoginUser ]  = useState<loginUser>({
   email : "",
   password : ""
  });


    const handleInputChange = (e:any) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginUser({...loginUser, [name] : value.trim()});
  }

  return (
    <section className='paddingLogin bg-transparent'>
       <div className='p-10 rounded-md relative w-[100%] flex'>
           <div>

           </div>

           <figure>
            
           </figure>
       </div>
    </section>
  )
}

export default Login
