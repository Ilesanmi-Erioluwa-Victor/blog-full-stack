import React from 'react'
import { Bars3Icon, PlusIcon} from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import ErrorImg from "src/assets/authentication/errorpage.svg" 
import { Button } from "src/components/atoms";
import GeneralLayout from 'src/layouts/GeneralLayouts/GeneralLayout';
import { Icon } from 'src/utils';
import { Header } from 'src/types';
let header: Header[] = [
  {
    title: "Home",
    link: "/",
    active: true,
  },
  {
    title: "Create",
    link: "/create-post",
    active: false,
  },
  {
    title: "Posts",
    link: "/posts",
    active: false,
  },
  {
    title: "Register",
    link: "/sign_up",
    active: false,
  },
  {
    title: "Login",
    link: "/login",
    active: false,
  },
 
];

const PublicNav = () => {
     const changePath = (path) => {
    // router.push(path);
  };

    const handleMenuClick = (item, index) => {
    header.map((item) => (item.active = false));
    // if (router.pathname === item.link) {
    //   header[index].active = true;
    // }
  };


  return (
    <GeneralLayout>
      <div className={`w-full h-20 sticky top-0 z-50  bg-orange-900`}>
      <div className={`relative h-20`}>
        <header className="w-12/12 relative z-50 md:w-full xl:w-full mx-auto h-full flex justify-between  items-center px-10">
          <Link to="/" className='w-[3rem] h-[3rem]'>
            <div className={`h-full flex items-center cursor-pointer`}>
              <Icon src={ErrorImg} alt="logo" className="" />
            </div>
          </Link>
          <nav className="hidden lg:flex items-center h-full ">
            <ul className="flex lg:space-x-3 xl:space-x-5 md:gap-4 lg:gap-6">
              {header.map((item, index) => (
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
                {/* <Link to={"/login"}>
              <Button className={`w-36 h-10  md:w-28 xl:w-36 rounded-md capitalize text-sm transition-all bg-orange-400
                text-white border border-dark_blue hover:bg-dark_blue hover:text-white  hover:opacity-80`} >
                Login 
            </Button>
                </Link> */}
              
              <Link to={"/newPost"}>
              <Button
                className={`pl-3 w-36 md:w-28 xl:w-36 rounded-md capitalize h-10 text-sm transition-all hover:bg-orange-400
                text-dark_blue border border-dark_blue hover:bg-dark_blue hover:text-white  hover:opacity-80 flex items-center gap-3`}
              ><PlusIcon className='w-3 self-center'/> New Post </Button>
              </Link>
            </div>
            <div className="flex lg:hidden h-full items-center">
              <Bars3Icon className="w-8 h-6" />
            </div>
          </div>
        </header>
      </div>
    </div>
    </GeneralLayout>
  )
}




export default PublicNav
