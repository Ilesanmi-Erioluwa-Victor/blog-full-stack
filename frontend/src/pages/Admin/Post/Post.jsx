import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    body = <Loader />;
  }

  if (postLists) {
    body = postLists.map((data) => (
      data.category
    ))
  }
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  return <div> { body}</div>;
};

export default Post;
