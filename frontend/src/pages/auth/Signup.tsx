import React, { useState } from "react";
import {
  EnvelopeIcon,
  EyeSlashIcon,
  EyeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import google from "src/assets/svg/google.svg";
import { Button, Input } from "src/components/atoms";
import { Icon } from "src/utils";

interface User {
  firstName : string;
  password : string;
  lastName: string;
  email : string;

}

const Signup = (): JSX.Element => {
  const [passwordFieldType, setPasswordFieldType] = useState<boolean>(false);
  const [user, setUser ]  = useState<User>({
   firstName : "",
   lastName : "",
   email : "",
   password : ""
  });
  // const dispatch = useDispatch();

  const handleInputChange = (e:any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name] : value});
    console.log({
      name, value
    })
  }

  const handleInputSubmit = async (event: any) => {
    event.preventDefault();
    alert("clicked...")
    const { firstName,lastName, email, password } = user;

    if(! firstName || !lastName || !email || !password) {
      return  toast.error("You are offline", {
              toastId: "offline-id",
            });
    }
    //await dispatch({firstName,lastName, email, password})
  }

  return (
    <div className="flex padding bg w[100%] relative">
      {/* First Section */}
      <section className="flex sec-flex w-[70%] gap-4">
        <div className="sec-flex">
          <Link to={"/"} className="w-[10rem]">
            <h3 className="text-xl text-orange-700 font-bold">Blog Platform</h3>
          </Link>
          <h2 className="text-[2rem] mt-[5rem]">
            Join Our blogging platform, <br />
            to experience unlimited Resources.
          </h2>

          <p className="mb-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            <br /> Numquam aperiam unde nobis excepturi sed. Magnam?
          </p>
        </div>

        <Button
          className={`flex items-center gap-2 py-[1rem] pl-[7rem] pr-0 lg:px-[6rem] mb-8 max-w-[381px] lg:max-w-[455px] w-[95%] googleContainer`}
        >
          <Icon src={google} alt="google" />
          <p className={`font-[500] text-[0.875rem]`}>Sign up with Google</p>
        </Button>

        <h2 className={`w-[100%] lg:w-[100%] divider`}>
          <span
            className={`text-light_grey bg-white  font-[400] text-[0.875rem] px-[20px]`}
          >
            or with email
          </span>
        </h2>

        <form className="sec-flex mb-3" onSubmit={handleInputSubmit}>
          {/*  first name and last Name*/}
          <fieldset className="flex gap-2 w-[100%]">
            <div className="w-[100%] relative">
              <Input
                type={"text"}
                label={"FirstName"}
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                placeholder={"Enter your firstname"}
                className="mt-2 focus:border-transparent focus:outline-transparent transition-all p-6 pl-8"
                fieldsetClass="w-[100%]"
              />
              <span className="absolute bottom-4 left-2">
                {<UserIcon className="w-5 bg-inherit" />}
              </span>
            </div>
            <div className="w-[100%] relative">
              <Input
                type={"text"}
                label={"lastName"}
                  name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                placeholder={"Enter your lastname"}
                className="mt-2 focus:border-transparent focus:outline-transparent p-6 pl-8"
                fieldsetClass="w-[100%]"
              />
              <span className="absolute bottom-4 left-2">
                {<UserIcon className="w-5 bg-inherit" />}
              </span>
            </div>
          </fieldset>
          {/*  Email and  Password*/}
          <fieldset className="flex gap-2 w-[100%]">
            <div className="w-[100%] relative">
              <Input
                type={"email"}
                label={"Email"}
                  name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder={"Enter your Email"}
                className="mt-2 focus:border-transparent focus:outline-transparent transition-all p-6 pl-8"
                fieldsetClass="w-[100%]"
              />
              <span className="absolute bottom-4 left-2">
                {<EnvelopeIcon className="w-5 bg-inherit" />}
              </span>
            </div>

            <div className="w-[100%] relative">
              <Input
                type={passwordFieldType ? "text" : "password"}
                label={"Password"}
                  name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder={"Enter your Password"}
                className="mt-2 focus:border-transparent focus:outline-transparent transition-all p-6 pl-8"
                fieldsetClass="w-[100%]"
              />
              <span className="absolute bottom-4 left-2">
                {<LockClosedIcon className="w-5 bg-inherit" />}
              </span>
              <span
                className="absolute bottom-4 right-2 cursor-pointer"
                onClick={() => setPasswordFieldType(!passwordFieldType)}
              >
                {passwordFieldType ? (
                  <EyeSlashIcon
                    className="w-5 bg-inherit"
                    title="Show Pasword"
                  />
                ) : (
                  <EyeIcon className="w-5 bg-inherit" title="Hide Password" />
                )}
              </span>
            </div>
          </fieldset>
          <Button
            className={
              "block bg-orange-600 self-start w-[50%] rounded-md text-white text-sm p-4"
            }
          >
            Submit
          </Button>
        </form>
      </section>

      {/* Second Section */}
      <section className="w-[30%]">
        <h1>Hello from Prime</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          quas eligendi repellat, perspiciatis est maxime, libero dolorum
          molestias cupiditate ab veritatis sunt tempora sit distinctio
          doloremque obcaecati, cumque voluptas in.
        </p>
      </section>
    </div>
  );
};

export default Signup;
