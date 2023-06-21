import React, { useState, useEffect } from 'react';
import {
  EnvelopeIcon,
  EyeSlashIcon,
  EyeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { userData } from 'src/types';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { toast } from 'react-toastify';
import google from 'src/assets/svg/google.svg';
import { Button, Input, Loader } from 'src/components/atoms';
import { userLoginAction } from 'src/redux/Slices/users/user';
import { Icon } from 'src/utils';

const Login = () => {
  const [passwordFieldType, setPasswordFieldType] = useState<boolean>(false);
  const [login, setLogin] = useState<userData>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userState = useAppSelector((state) => state?.users);

  const { error, isAuthenticated, isLoading, user } = userState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({ ...login, [name]: value.trim() });
  };

  const handleInputSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { email, password } = login;

    if (!email || !password) {
      return toast.error('Please, fill up all inputs !!!', {
        toastId: 'fill_inputs',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    } else if (error?.serverError || error?.appError?.message) {
      const message = `Invalid logins Credentials - ${error?.appError?.message}`;
      console.log(message);
      return (toast.error(message, {
        toastId: 'Error',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      }));
      
    } else {
      dispatch(userLoginAction({ email, password }));
    }

  };

  // useEffect(() => {
  //   if (isAuthenticated === true) {
  //     navigate(`/profile/${user?._id}`);
  //   }

  //   if (user?.isAdmin === true) {
  //     navigate('/dashboard');
  //   }
  // }, [isAuthenticated, navigate, user?._id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className='paddingLogin bg-transparent'>
            <div className='p-10 rounded-md relative w-[100%] flex bg-white gap-4'>
              <section className='w-[50%] sec-flex full'>
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
                  <h2 className='text-[2rem] max-md:text-4xl'>
                    Login to read <br />
                    unlimited Resources.
                  </h2>

                  <p className='mb-6 max-md:text-[1.1rem]'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </p>
                </div>

                <Button
                  className={`flex items-center gap-2 py-[1rem] pl-[1rem] pr-0 lg:px-[4rem] mb-8 max-w-[381px] lg:max-w-[455px] w-[95%] googleContainer`}
                >
                  <Icon
                    src={google}
                    alt='google'
                  />
                  <p className={`font-[500] text-[0.875rem]`}>
                    login up with Google
                  </p>
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
                  <div className='w-[100%] relative'>
                    <Input
                      type={'email'}
                      label={'Email'}
                      name='email'
                      value={login.email}
                      onChange={handleInputChange}
                      placeholder={'Enter your Email'}
                      className='mt-2 border-transparent focus:border focus:outline transition-all p-6 pl-8'
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
                      value={login.password}
                      onChange={handleInputChange}
                      placeholder={'Enter your Password'}
                      className='mt-2 border-transparent focus:border focus:outline transition-all p-6 pl-8'
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
                          title='Show Password'
                        />
                      ) : (
                        <EyeIcon
                          className='w-5 bg-inherit'
                          title='Hide Password'
                        />
                      )}
                    </span>
                  </div>
                  <Button
                    // disabled={isLoading}
                    className={
                      'block bg-yellow-600 self-start w-[50%] rounded-md text-white text-sm p-4 max-md:w-full'
                    }
                  >
                    Login
                  </Button>
                </form>

                <p className='flex justify-end items-center'>
                  <span>Not yet a member?</span>
                  <span className='bg-transparent transition-all text-black hover:bg-yellow-600 ml-3 pr-3 rounded-sm hover:text-white'>
                    <Link
                      to={'/signup'}
                      className='block text-center px-6 py-1'
                    >
                      {' '}
                      Sign up
                    </Link>
                  </span>
                </p>
              </section>

              <figure className='w-[50%] back none'></figure>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default Login;
