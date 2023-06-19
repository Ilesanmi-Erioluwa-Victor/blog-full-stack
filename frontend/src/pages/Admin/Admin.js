import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import briefcase from 'src/assets/admin_icons/briefcase.svg';
import directsend from 'src/assets/admin_icons/direct-send.svg';
import messages_2 from 'src/assets/admin_icons/messages-2.svg';
import messages from 'src/assets/admin_icons/messages.svg';
import setting_3 from 'src/assets/admin_icons/setting-3.svg';
import user from 'src/assets/admin_icons/user.svg';
import { Button, Loader } from 'src/components/atoms';
import { userLogOutAction } from 'src/redux/Slices/users/user';
import { Icon } from 'src/utils';

export default function AdminNavigation(props) {
  let header = [
    {
      title: 'Home',
      link: '/dashboard',
      active: true,
      icon: user,
    },
    {
      title: 'Create',
      link: '/dashboard/create-post',
      active: false,
      icon: briefcase,
    },
    {
      title: 'Posts',
      link: '/dashboard/posts',
      active: false,
      icon: setting_3,
    },

    {
      title: 'Authors',
      link: '/dashboard/authors',
      active: false,
      icon: messages,
    },

    {
      title: 'Add Category',
      link: '/dashboard/add-category',
      active: false,
      icon: directsend,
    },

    {
      title: 'Category List',
      link: '/dashboard/category-list',
      active: false,
      icon: messages_2,
    },
  ];

  const dispatch = useDispatch();
  const [navSwitch, setNavSwitch] = useState(false);
  const [focused, setFocused] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector((state) => state.users);
  const { userAuth, loading } = users;
  const isAdmin = userAuth?.isAdmin;

  useEffect(() => {
    if (!isAdmin) {
      navigate(`/login`);
    }
  }, [isAdmin, navigate]);

  const handleNavSwitch = () => {
    setNavSwitch(!navSwitch);
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className='flex w-full bg-gray-150'>
            {/* Sidebar */}
            <section
              className={`shadow-sm ${
                navSwitch === true ? 'w-max' : 'w-[17%]'
              } h-screen relative px-5 z-50`}
            >
              <div className={`relative w-full`}>
                <header className='w-full relative z-50 h-full flex flex-col space-y-10'>
                  <Link to='/'>
                    <div
                      className={`${
                        navSwitch === true
                          ? 'flex cursor-pointer pt-8'
                          : 'flex cursor-pointer pt-8'
                      }`}
                    >
                      <img
                        src='/main_logo.svg'
                        alt='logo'
                        className=''
                      />
                    </div>
                  </Link>
                  <nav
                    className='flex items-center h-full '
                    onMouseLeave={() => setFocused(null)}
                  >
                    <ul className='flex flex-col space-y-5'>
                      {header.map((item, index) => (
                        <li key={index}>
                          <Link to={item.link}>
                            <span
                              onMouseEnter={() => setFocused(item.title)}
                              className={`text-sm  flex capitalize cursor-pointer relative ${
                                navSwitch === true ? 'px-3' : 'px-5 pr-4'
                              } py-2 rounded-lg ${
                                location.pathname === item.link &&
                                ' bg-green-600'
                              }`}
                            >
                              <div className='flex space-x-2 items-center justify-between text-sm z-10 text-black hover:text-white'>
                                <span>
                                  <Icon
                                    alt={item.title}
                                    src={item.icon ? item.icon : ''}
                                  />
                                </span>
                                <span
                                  className={`  ${
                                    navSwitch === true ? 'hidden ' : ''
                                  }`}
                                >
                                  {item.title}
                                </span>
                              </div>
                              {focused === item.title ? (
                                <motion.div
                                  initial={{ y: 100 }}
                                  whileInView={{ y: 0 }}
                                  transition={{ duration: 0.8 }}
                                  className='absolute bottom-0 left-0 right-0 w-full h-full text-primary_green bg-light_green px-5 pr-8 m-0 z-0 rounded-lg space-x-0'
                                  layoutId='highlight'
                                />
                              ) : null}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </header>
              </div>

              {navSwitch === true ? (
                <ChevronLeftIcon
                  onClick={() => dispatch(userLogOutAction())}
                  className='w-6 mt-8 cursor-pointer'
                />
              ) : (
                <Button
                  className={`w-36 h-10  md:w-28 xl:w-36 rounded-md capitalize text-sm 
                text-dark_blue border border-dark_blue hover:bg-dark_blue hover:text-white  hover:opacity-80`}
                  onClick={() => dispatch(userLogOutAction())}
                >
                  Logout
                </Button>
              )}

              <div
                onClick={handleNavSwitch}
                className={`absolute top-16 cursor-pointer hover:bg-light_green ${
                  navSwitch === true ? 'bg-[#f8f8f8]' : 'bg-white'
                } -right-3 drop-shadow-lg rounded-full p-1 ${
                  navSwitch === true ? 'transform rotate-180' : ''
                }`}
              >
                <ChevronLeftIcon className='w-4 h-4 z-50' />
              </div>
            </section>

            {/* Main Content.. */}
            <div className='bg-[#f8f8f8] w-full padding'>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}
