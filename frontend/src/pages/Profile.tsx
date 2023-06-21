import React, { useEffect } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from 'src/utils';


const Profile = () => {
  const dispatch = useAppDispatch();
  
  const userState = useAppSelector((state) => state?.users);

  const { error, isAuthenticated, isLoading, user } = userState;
  // const user = useSelector((state) => state?.users?.userAuth);
  // const post = useSelector((state) => state?.post);
  
  const navigate = useNavigate();
  
  const { id } = useParams();

     useEffect( () => {
      if(!user) {
      navigate("/login")
      }

      console.log(user)
     }, [user, navigate])
  
  return (
    <section className='bg-gray-900'>
      <main className=' w-[70%] mx-auto flex flex-col'>
        <div className='h-[25rem] rounded'>
          {/* <Icon
            src={user?.profilePhoto}
            className='block max-width-[100%] max-h-[100%] object-center object-cover w-[100%] shadow-2xl'
            alt={`${user?.firstName - user?.lastName}`}
          /> */}
        </div>

        <div className='flex items-center'>
          <div
            className='h-[10rem] w-[10rem] rounded-[50%] pt-6 bg-red-800 mt-4'
            // style={{
            //   backgroundImage: `url(${user?.profilePhoto})`,
            //   backgroundRepeat: 'no-repeat',
            //   backgroundPosition: 'center',
            //   backgroundSize: 'cover',
            //   objectFit: 'contain',
            // }}
          />

          <div className='pl-5'>
            {/* <h3 className='text-4xl text-white mb-4'>
              {user?.lastName} {user?.firstName}
            </h3> */}

            <button className='flex items-center gap-2 text-white bg-orange-400 p-3 rounded-lg'>
              <EnvelopeIcon className='w-5 h-5 ' />
              {/* <p>{user?.email}</p> */}
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Profile;
