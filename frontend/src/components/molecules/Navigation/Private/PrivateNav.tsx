import React, { useEffect } from 'react';
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/atoms';
import GeneralLayout from 'src/layouts/GeneralLayouts/GeneralLayout';
import { userLogOutAction } from 'src/redux/Slices/users/user';
import { Icon } from 'src/utils';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { AccountMenu } from '../Menu/Menu';

const PrivateNav = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state?.users);

  const { user } = userState;
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.token === null) {
      navigate('/login');
    }
  }, [user, navigate]);

  // if()

  console.log(user);

  const userNav = [
    {
      name: 'Your Profile',
      link: `/profile`,
    },

    {
      name: 'Change your Password',
      link: `/update-password`,
    },
  ];

  // const changePath = (path) => {
  //   // router.push(path);
  // };

  // const handleMenuClick = (item, index) => {
  //   header.map((item) => (item.active = false));
  //   // if (router.pathname === item.link) {
  //   //   header[index].active = true;
  //   // }
  // };

  return (
    <GeneralLayout>
      <div className={`w-full h-20 sticky top-0 z-50  bg-green-900`}>
        <div className={`relative h-20`}>
          <header className='w-11/12 relative z-50 md:w-11/12 xl:w-10/12 mx-auto h-full flex justify-between  items-center'>
            <AccountMenu user={userNav}/>
            {/*
            <nav className='hidden lg:flex items-center h-full '>
              <ul className='flex lg:space-x-3 xl:space-x-5'>
                {header.map((item, index) => (
                  <Link
                    to={item.link}
                    key={index}
                  >
                    <li
                      // onClick={() => handleMenuClick(item, index)}
                      className={`text-sm flex capitalize cursor-pointer hover:text-primary_green hover:underline hover:underline-offset-4 ${
                        item.active &&
                        'text-primary_green underline underline-offset-4'
                      }`}
                    >
                      {/* <span>{item.title}</span>
                      <span>{item.icon ? item.icon : ''}</span> */}
                    {/* </li>
                  </Link>
                ))}
              </ul>
            </nav> */}
            
            <div className='flex space-x-4 items-center'>
              <div className='hidden md:flex space-x-4'>
                <Button
                  className={`w-36 h-10  md:w-28 xl:w-36 rounded-md capitalize text-sm 
                text-dark_blue border border-dark_blue hover:bg-dark_blue hover:text-white  hover:opacity-80`}
                  onClick={() => dispatch(userLogOutAction())}
                >
                  Logout
                </Button>

                <Link to={'/newPost'}>
                  <Button
                    className={`pl-3 w-36 md:w-28 xl:w-36 rounded-md capitalize h-10 text-sm 
                text-dark_blue border border-dark_blue hover:bg-dark_blue hover:text-white  hover:opacity-80 flex items-center gap-3`}
                  >
                    <PlusIcon className='w-3 self-center' /> New Post{' '}
                  </Button>
                </Link>
              </div>
              <div className='flex lg:hidden h-full items-center'>
                <Bars3Icon className='w-8 h-6' />
              </div>

              <figure className='relative'>
                <Icon
                  src={''}
                  alt='user'
                  className=''
                />
                <ul className='absolute top-10 right-6 w-full'>
                  {userNav.map((items, index) => (
                    <li
                      key={index}
                      className='w-full bg-red-900'
                    >
                      <Link to={items.link}>{items.name}</Link>
                    </li>
                  ))}
                </ul>
              </figure>
            </div>
          </header>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default PrivateNav;
