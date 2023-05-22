import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TagIcon, EyeIcon } from '@heroicons/react/24/solid';
import { Loader } from "src/components/atoms";
import { fetchPostsAction } from "src/redux/Slices/Post/post";

const Post = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state?.post);

  const { loading, appError, postLists, serverError } = posts;
  console.log(postLists)
  let body;
  if (appError || serverError) {
    body = `${serverError} - ${appError}`;
  }

  if (loading || !postLists) {
    body = (
      <div className="text-center">
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  if (postLists) {
    body = postLists.map((data) => {
      const { image } = data;
      return (
        <div
          className='bg-green-600'
          key={data._id}
        >
          <Link
            className='border block'
            to={''}
          >
            <img
              src={data?.image}
              alt='user'
            />
            <div className="flex items-center gap-4">
              <div className='flex items-center'>
                <TagIcon className='w-5 h-5 rounded inline-block' />
                <p>{data?.category}</p>
              </div>

              <div className="flex items-center">
                <EyeIcon className='w-5 h-5 rounded inline-block' />
                <p>{data?.numViews}</p>
              </div>
            </div>
          </Link>
        </div>
      );
    
  });
  }
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  return (
    <>
      <h1 className='text-xl'>List of Posts</h1>
      <div className='posts gray'>{body}</div>
    </>
  );
};

export default Post;
