import React from 'react'
import { Link } from 'react-router-dom';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import DateFormatter from 'src/utils/DateFormatter';
import { Icon } from 'src/utils';

const PostCard = ({post}) => {
  console.log(post)
  return (
    <div>
      <div className='mb-10  w-full lg:w-1/4 '>
        <Link to={`/post/${post?._id}`}>
          {/* Post image */}
          <Icon
            className='w-full h-full object-cover rounded'
            src={post?.image}
            alt=''
          />
        </Link>
        {/* Likes, views dislikes */}
        <div className='flex flex-row bg-gray-300  justify-center w-full  items-center '>
          {/* Likes */}
          <div className='flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1'>
            {/* Toggle like  */}
            <div className=''>
              <HandThumbUpIcon
                // onClick={() => dispatch()}
                className='h-7 w-7 text-indigo-600 cursor-pointer'
              />
            </div>
            <div className='pl-2 text-gray-600'>
              {/* {post?.likes?.length} */}
            </div>
          </div>
          {/* Dislike */}
          <div className='flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1'>
            <div>
              <HandThumbDownIcon
                // onClick={() => dispatch()}
                className='h-7 w-7 cursor-pointer text-gray-600'
              />
            </div>
            <div className='pl-2 text-gray-600'>
              {/* {post?.disLikes?.length} */}
            </div>
          </div>
          {/* Views */}
          <div className='flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1'>
            <div>
              <EyeIcon className='h-7 w-7  text-gray-400' />
            </div>
            <div className='pl-2 text-gray-600'>{/* {post?.numViews} */}</div>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-3/4 px-3'>
        {/* <Link className="hover:underline">
                        <h3 className="mb-1 text-2xl text-green-400 font-bold font-heading"> */}
        {/* {capitalizeWord(post?.title)} */}
        {/* {post?.title}
                        </h3>
                      </Link> */}
        <p className='text-gray-300'>{post?.description}</p>
        {/* Read more */}
        {/* <Link
                        to={`/posts/${post?._id}`}
                        className="text-indigo-500 hover:underline"
                      >
                        Read More..
                      </Link> */}
        {/* User Avatar */}
        <div className='mt-6 flex items-center'>
          <div className='flex-shrink-0'>
            <Link to={`profile/${post?.user?._id}`}>
              <img
                className='h-10 w-10 rounded-full'
                src={post?.user?.profilePhoto}
                alt=''
              />
            </Link>
          </div>
          <div className='ml-3'>
            <p className='text-sm font-medium text-gray-900'>
              {/* <Link
                              to={`/profile/${post?.user?._id}`}
                              className="text-yellow-400 hover:underline "
                            >
                              {post?.user?.firstName} {post?.user?.lastName}
                            </Link> */}
            </p>
            <div className='flex space-x-1 text-sm text-green-500'>
              <time>
                <DateFormatter date={post?.createdAt} />
              </time>
              <span aria-hidden='true'>&middot;</span>
            </div>
          </div>
        </div>
        {/* <p class="text-gray-500">
                             Quisque id sagittis turpis. Nulla sollicitudin rutrum
                             eros eu dictum...
                           </p> */}
      </div>
    </div>
  );
}

export default PostCard

