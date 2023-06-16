import React, { useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAction } from 'src/redux/Slices/Post/post';
import { fetchCategoriesAction } from 'src/redux/Slices/Category/category';
import PostCard from 'src/pages/Post/PostCard';

const PostList = () => {
  const dispatch = useDispatch();

  // Fetch post
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  // Fetch Categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  // Select post
  const post = useSelector((state) => state?.post);

  // Select category
  const category = useSelector((state) => state?.category);

  const { loading, postLists, appError, serverError } = post;

  const {
    loading: catLoading,
    categoryList,
    appError: catError,
    serverError: cateserverError,
  } = category;
  console.log(post);
  return (
    <section>
      <div className='py-20 bg-gray-900 min-h-screen radius-for-skewed'>
        <div className='container mx-auto px-4'>
          <div className='mb-16 flex flex-wrap items-center'>
            <div className='w-full lg:w-1/2'>
              <span className='text-green-600 font-bold'>
                Latest Posts from our awesome authors
              </span>
              <h2 className='text-4xl text-gray-300 lg:text-5xl font-bold font-heading'>
                Latest Post
              </h2>
            </div>
            <div className=' block text-right w-1/2'>
              {/* View All */}
              <button
                // onClick={() => dispatch(fetchPostsAction(""))}
                className='inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200'
              >
                View All Posts
              </button>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3'>
            <div className='mb-8 lg:mb-0 w-full lg:w-1/4 px-3'>
              <div className='py-4 px-6 bg-gray-600 shadow rounded'>
                <h4 className='mb-4 text-gray-500 font-bold uppercase'>
                  Categories
                </h4>
                <ul>
                  {catLoading ? (
                    <>
                      <Circles
                        height='100'
                        width='100'
                        color='#4fa94d'
                        ariaLabel='circles-loading'
                        wrapperStyle={{
                          display: 'flex',
                        }}
                        wrapperClass=''
                        visible={true}
                      />
                    </>
                  ) : catError || cateserverError ? (
                    <h1>
                      {cateserverError} {catError}
                    </h1>
                  ) : !categoryList?.length ? (
                    <h1 className='text-yellow-400 text-lg text-center'>
                      No Category Found
                    </h1>
                  ) : (
                    categoryList?.map((category) => (
                      <li>
                        <p
                          onClick={() =>
                            dispatch(fetchPostsAction(category?.title))
                          }
                          className='block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500'
                        >
                          {category?.title}
                        </p>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            <div className='w-full lg:w-3/4 px-3'>
              {/* Post goes here */}

              {appError || serverError ? (
                <h1 className='text-yellow-600 text-center text-lg '>
                  {serverError} {appError}
                </h1>
              ) : !postLists?.length ? (
                <h1 className='text-yellow-400 text-lg text-center'>
                  No Post Found
                </h1>
              ) : (
                postLists?.map((post) => {
                  const id = post[0]?.user;
                  console.log(id);
                  return (
                    <section
                      key={post.id}
                      className='flex flex-wrap bg-gray-900 -mx-3  lg:mb-6'
                    >
                      <PostCard {...post} />
                    </section>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray-900'>
        <div className='skew bg-green-500 skew-bottom mr-for-radius'>
          {/* <svg
            class="h-8 md:h-12 lg:h-10 w-full text-gray-900"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
          </svg> */}
        </div>
        <div className='skew bg-gray-500  skew-bottom ml-for-radius'>
          {/* <svg
            class="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
          </svg> */}
        </div>
      </div>
    </section>
  );
};

export default PostList;
