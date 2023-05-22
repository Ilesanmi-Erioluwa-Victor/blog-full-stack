import React, { useState, useEffect } from 'react';
import {
  EnvelopeIcon,
  EyeSlashIcon,
  EyeIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorImg from 'src/assets/authentication/errorpage.svg';
import google from 'src/assets/svg/google.svg';
import { Button, Input } from 'src/components/atoms';
import { userRegisterAction } from 'src/redux/Slices/Users/user';
// import { RootState } from "src/redux/store";
import { Icon } from 'src/utils';

// export interface User {
//   firstName : string;
//   password : string;
//   lastName: string;
//   email : string;

// }

const Signup = () => {
  const [passwordFieldType, setPasswordFieldType] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
    const state=  useSelector((state) => state);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value.trim() });
  };

  const handleInputSubmit = async (event) => {
    event.preventDefault();
    try {
      const { firstName, lastName, email, password } = userInfo;

      if (!firstName || !lastName || !email || !password) {
        return toast.error('Please, fill up all inputs !!!', {
          toastId: 'fill_inputs',
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      }
       dispatch(userRegisterAction(userInfo));

      if (userInfo) {
        setTimeout(() => {
          navigate(`/login`);
        }, 500);
        
      }
    } catch (error) {
      console.log(error);
    }
console.log(state)
  };

  return (
    <div className='flex padding bg w[100%] relative gap-4 items-center'>
      {/* First Section */}
      <section className='flex sec-flex w-[60%] gap-4 full'>
        <div className='sec-flex'>
          <Link
            to={'/'}
            className='w-[10rem] flex gap-1'
          >
            <Icon
              src={google}
              alt='logo'
            />
            <span className='text-base text-yellow-600 font-bold'>
              Blog Platform
            </span>
          </Link>
          <h2 className='text-[2rem] mt-[5rem] max-md:text-4xl'>
            Join Our blogging platform, <br />
            to experience unlimited Resources.
          </h2>

          <p className='mb-6 max-md:text-[1.1rem]'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            <br /> Numquam aperiam unde nobis excepturi sed. Magnam?
          </p>
        </div>

        <Button
          className={`flex items-center gap-2 py-[1rem] pl-[1rem] pr-0 lg:px-[6rem] mb-8 max-w-[381px] lg:max-w-[455px] w-[95%] googleContainer`}
        >
          <Icon
            src={google}
            alt='google'
          />
          <p className={`font-[500] text-[0.875rem]`}>Sign up with Google</p>
        </Button>

        <h2 className={`w-[100%] lg:w-[100%] divider`}>
          <span
            className={`text-light_grey bg-white  font-[400] text-[0.875rem] px-[20px]`}
          >
            or with email
          </span>
        </h2>

        <form
          className='sec-flex mb-3'
          onSubmit={handleInputSubmit}
        >
          {/*  first name and last Name*/}
          <fieldset className='flex gap-2 w-[100%] max-md:flex-col max-md:gap-5'>
            <div className='w-[100%] relative'>
              <Input
                type={'text'}
                label={'FirstName'}
                name='firstName'
                value={userInfo.firstName}
                onChange={handleInputChange}
                placeholder={'Enter your firstname'}
                className='mt-2 focus:border-transparent focus:outline-transparent transition-all p-6 pl-8'
                fieldsetClass='w-[100%]'
              />
              <span className='absolute bottom-4 left-2'>
                {<UserIcon className='w-5 bg-inherit' />}
              </span>
            </div>
            <div className='w-[100%] relative'>
              <Input
                type={'text'}
                label={'lastName'}
                name='lastName'
                value={userInfo.lastName}
                onChange={handleInputChange}
                placeholder={'Enter your lastname'}
                className='mt-2 focus:border-transparent focus:outline-transparent p-6 pl-8'
                fieldsetClass='w-[100%]'
              />
              <span className='absolute bottom-4 left-2'>
                {<UserIcon className='w-5 bg-inherit' />}
              </span>
            </div>
          </fieldset>
          {/*  Email and  Password*/}
          <fieldset className='flex gap-2 w-[100%] max-md:flex-col max-md:gap-5'>
            <div className='w-[100%] relative'>
              <Input
                type={'email'}
                label={'Email'}
                name='email'
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder={'Enter your Email'}
                className='mt-2 focus:border-transparent focus:outline-transparent transition-all p-6 pl-8'
                fieldsetClass='w-[100%]'
              />
              <span className='absolute bottom-4 left-2'>
                {<EnvelopeIcon className='w-5 bg-inherit' />}
              </span>
            </div>

            <div className='w-[100%] relative'>
              <Input
                type={passwordFieldType ? 'text' : 'password'}
                label={'Password'}
                name='password'
                value={userInfo.password}
                onChange={handleInputChange}
                placeholder={'Enter your Password'}
                className='mt-2 focus:border-transparent focus:outline-transparent transition-all p-6 pl-8'
                fieldsetClass='w-[100%]'
              />
              <span className='absolute bottom-4 left-2'>
                {<LockClosedIcon className='w-5 bg-inherit' />}
              </span>
              <span
                className='absolute bottom-4 right-2 cursor-pointer'
                onClick={() => setPasswordFieldType(!passwordFieldType)}
              >
                {passwordFieldType ? (
                  <EyeSlashIcon
                    className='w-5 bg-inherit'
                    title='Show Pasword'
                  />
                ) : (
                  <EyeIcon
                    className='w-5 bg-inherit'
                    title='Hide Password'
                  />
                )}
              </span>
            </div>
          </fieldset>
          <Button
            className={
              'block bg-yellow-600 self-start w-[50%] rounded-md text-white text-sm p-4 max-md:w-full'
            }
          >
            Submit
          </Button>
        </form>
        <p className='flex justify-end items-center'>
          <span>Already a member?</span>
          <span className='bg-transparent transition-all text-black hover:bg-yellow-600 ml-3 pr-3 rounded-sm hover:text-white'>
            <Link
              to={'/login'}
              className='block text-center px-6 py-1'
            >
              {' '}
              login
            </Link>
          </span>
        </p>
      </section>

      {/* Second Section */}
      <section className='w-[40%] sec-flex none'>
        <h2 className='text-lg text-bg md:text-4xl font-semibold mb-4'>
          Join Today
        </h2>
        <p>
          Pen down your ideas on a platform that will you give you best
          inspiration
        </p>
        <p className='mt-[-.5rem]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum beatae
          sed illum error quo dicta in exercitationem aperiam doloribus neque?
        </p>
        <figure className='w-full'>
          <Icon
            src={ErrorImg}
            alt='logo'
          />
        </figure>
      </section>
    </div>
  );
};

export default Signup;
