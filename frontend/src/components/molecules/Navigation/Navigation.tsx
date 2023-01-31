import React from "react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Button } from "src/components/atoms";
Link;
Button;





const Navigation = (): JSX.Element => {
  const changePath = (path: string) => {
    // router.push(path);
  };

  const handleMenuClick = (item: headerType, index: number) => {
    header.map((item) => (item.active = false));
    // if (router.pathname === item.link) {
    //   header[index].active = true;
    // }
  };
  return (
    <div className={`w-full h-20 sticky top-0 z-50 bg-white`}>
      <div className={`relative h-20`}>
        <header className="w-11/12 relative z-50 md:w-11/12 xl:w-10/12 mx-auto h-full flex justify-between  items-center">
          <Link to="/">
            <div className={`w-1/12 h-full flex items-center cursor-pointer`}>
              <img src="/main_logo.svg" alt="logo" className="" />
            </div>
          </Link>
          <nav className="hidden lg:flex items-center h-full ">
            <ul className="flex lg:space-x-3 xl:space-x-5">
              {header.map((item: any, index: number) => (
                <Link to={item.link} key={index}>
                  <li
                    onClick={() => handleMenuClick(item, index)}
                    className={`text-sm flex capitalize cursor-pointer hover:text-primary_green hover:underline hover:underline-offset-4 ${
                      item.active &&
                      "text-primary_green underline underline-offset-4"
                    }`}
                  >
                    <span>{item.title}</span>
                    <span>{item.icon ? item.icon : ""}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <div className="flex space-x-4 items-center">
            <div className="hidden md:flex space-x-4">
              <Button
                text="sign in"
                className="w-36 h-10  md:w-28 xl:w-36 rounded-md text-sm capitalize text-white bg-dark_blue hover:opacity-80"
                onClick={() => changePath("/auth/login")}
              />
              <Button
                text="Post jobs"
                className="w-36 md:w-28 xl:w-36 rounded-md capitalize h-10 text-sm text-dark_blue border border-dark_blue hover:bg-dark_blue hover:text-white  hover:opacity-80"
              />
            </div>
            <div className="flex lg:hidden h-full items-center">
              <Bars3Icon className="w-8 h-6" />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navigation;
