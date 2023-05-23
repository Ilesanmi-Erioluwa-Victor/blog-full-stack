import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Icon } from 'src/utils';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users?.userAuth);
  console.log(user);
  const { id } = useParams();
  return (
    <section className='bg-gray-900'>
      <main className=' w-[70%] mx-auto flex'>
        <div className='h-[25rem] rounded'>
          <Icon
            src={user?.profilePhoto}
            className='block max-width-[100%] max-h-[100%] object-center object-cover w-[100%] shadow-2xl'
            alt={user?.firstName - user?.lastName}
          />
        </div>

        <div
          className='h-[10rem] w-[10rem] rounded-[50%] pt-6 bg-red-800'
          style={{ backgroundImage: `url(${user?.profilePhoto})`, backgroundRepeat:"no-repeat", backgroundPosition: "center" }}
        >
          {/* <Icon
            sty
            src={user?.profilePhoto}
            className='block max-width-[100%] max-h-[100%] object-center object-cover w-[5rem] h-[5rem] shadow-2xl'
            alt={user?.firstName - user?.lastName}
          /> */}
        </div>
      </main>
    </section>
  );
};

export default Profile;
