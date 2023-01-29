import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "src/components/atoms";

const Signup = (): JSX.Element => {
  const [passwordFieldType, setPasswordFieldType] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordFieldType(!passwordFieldType);
  };

  return (
    <div className="flex padding bg-orange-300 w[100%] relative">
      {/* First Section */}
      <section className="flex sec-flex w-[70%]">
        <nav className="sec-flex">
          <Link to={"/"} className="w-[10rem]">
            <h3 className="text-xl text-orange-700 font-bold">Blog Platform</h3>
          </Link>
          <h2 className="text-[2rem] mt-[5rem]">
            Join Our blogging platform, to experience unlimited Resources.
          </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
            aperiam unde nobis excepturi sed. Magnam?
          </p>
        </nav>

        {/*  first name and last Name*/}
        <fieldset className="flex gap-2 w-[100%]">
          <Input
            type={"text"}
            label={"FirstName"}
            placeholder={"Enter your firstname"}
            className="mt-2 focus:border-none focus:outline-none transition-all"
            fieldsetClass="w-[100%]"
          />
          <Input
            type={"text"}
            label={"LastName"}
            placeholder={"Enter your lastname"}
            className="mt-2 focus:outline-none transition-all"
            fieldsetClass="w-[100%]"
          />
        </fieldset>
              {/*  Emailand last Password*/}
          <fieldset className="flex gap-2 w-[100%]">
          <Input
            type={"email"}
            label={"Email"}
            placeholder={"Enter your Email"}
            className="mt-2 focus:border-none focus:outline-none transition-all"
            fieldsetClass="w-[100%]"
          />
          <Input
            type={"password"}
            label={"Password"}
            placeholder={"Enter your Password"}
            className="mt-2 focus:outline-none transition-all"
            fieldsetClass="w-[100%]"
          />
        </fieldset>
        <p>Or</p>
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
