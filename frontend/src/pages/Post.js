import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Post = () => {
    const { id } = useParams;
    console.log(id)
  return <div>Hello from Post</div>;
};

export default Post;
