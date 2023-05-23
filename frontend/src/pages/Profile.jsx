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
    <section>
      <main className='bg-gray-600'>
        <div className='w-[70%] mx-auto bg-red-700 h-[30rem] rounded p-4'>
          <Icon
            src={user?.profilePhoto}
            className='block max-width-[auto]'
            alt={user?.firstName - user?.lastName}
          />
        </div>
      </main>
    </section>
  );
};

export default Profile;
