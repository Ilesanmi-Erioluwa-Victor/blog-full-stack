import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
// import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import navLinks from "./navLinks";



interface headerType {
  title: string;
  icon?: any;
  link: string;
  active: boolean;
}

let header: headerType[] = [
  {
    title: "Home",
    link: "/dashboard",
    active: true,
  },
  {
    title: "Create",
    link: "/dashboard/createPost",
    active: false,
  },
  {
    title: "Posts",
    link: "/dashboard/Posts",
    active: false,
  },

  {
    title: "Authors",
    link: "/dashboard/Authors",
    active: false,
  },

    {
    title: "Add Category",
    link: "/dashboard/addCategory",
    active: false,
  },

    {
    title: "Category List",
    link: "/dashboard/categoryList",
    active: false,
  },
 
];

export default function AdminNavigation(): JSX.Element {

  const [navSwitch, setNavSwitch] = useState(false);
  const [focused, setFocused] = React.useState<string | null>(null);

  const handleNavSwitch = () => {
    setNavSwitch(!navSwitch);
  };

  return (
    <aside
      className={`${
        navSwitch === true ? "w-max" : "w-2/12"
      } h-screen relative px-5 z-50`}>
      <div className={`relative w-full`}>
        <header className="w-full relative z-50 h-full flex flex-col space-y-10">
          <Link to="/">
            <div className={`flex cursor-pointer `}>
              <img
                src="/main_logo.svg"
                alt="logo"
                className=""
              />
            </div>
          </Link>
          <nav
            className="flex items-center h-full "
            onMouseLeave={() => setFocused(null)}>
            <ul className="flex flex-col space-y-5">
              {header.map((item: any, index: number) => (
                <li key={index}>
                  <Link to={item.link}>
                    <span
                      onMouseEnter={() => setFocused(item.title)}
                      className={`text-sm  flex capitalize cursor-pointer relative ${
                        navSwitch === true ? "px-5" : "px-5 pr-8"
                      } py-2 rounded-lg ${
                        // router.pathname === item.route &&
                        "text-primary_green bg-light_green"
                      }`}>
                      <div className="flex space-x-2 items-center z-10">
                        <span>
                          {/* <Image
                            alt={item.title}
                            src={item.icon ? item.icon : ""}
                            height={18}
                            width={18}
                            layout="fixed"
                          /> */}
                        </span>
                        <span
                          className={`${navSwitch === true ? "hidden" : ""}`}>
                          {item.title}
                        </span>
                      </div>
                      {/* {focused === item.title ? (
                        <motion.div
                          transition={{
                            layout: {
                              duration: 0.2,
                              ease: "easeOut",
                            },
                          }}
                          className="absolute bottom-0 left-0 right-0 w-full h-full text-primary_green bg-light_green px-5 pr-8 m-0 z-0 rounded-lg space-x-0"
                          layoutId="highlight"
                        />
                      ) : null} */}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </div>
      <div
        onClick={handleNavSwitch}
        className={`absolute top-16 cursor-pointer hover:bg-light_green ${
          navSwitch === true ? "bg-[#f8f8f8]" : "bg-white"
        } -right-3 drop-shadow-lg rounded-full p-1 ${
          navSwitch === true ? "transform rotate-180" : ""
        }`}>
        <ChevronLeftIcon className="w-4 h-4 z-50" />
      </div>
    </aside>
  );
}
