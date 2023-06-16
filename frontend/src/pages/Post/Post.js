import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();
  console.log(postId);
  return <div>Hello from Post</div>;
};

export default Post;
