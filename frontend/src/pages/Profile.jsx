import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams();
    console.log(id)
  return <div>Hello</div>;
};

export default Profile;