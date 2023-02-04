import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Input, Button } from "src/components/atoms";
import { getCategoryAction, updateCategoryAction } from "src/redux/Slices/Category/category";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Updatecategory = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // Get the category id
  useEffect( () =>{
    dispatch(getCategoryAction(id))
  },[dispatch, id])

  const categorystate = useSelector((state) => state?.category);
  const { serverError, category, loading } = categorystate;

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    if (!title) {
       toast.error("Please, add post category!!!", {
        toastId: "post_category",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
    // dispatch(createC(title));
    setTitle("")
    if (category?.user) {
       toast.success("You have succesfully created category!!!", {
        toastId: "create_post_category",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };
  if (serverError) {
    toast.error(`${serverError.message}`, {
      toastId: "post_category",
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  }

  return (
    <form className="sec-flex" onSubmit={handleFormSubmit}>
      <h2 className="text-2xl font-semibold">Update  Post Category</h2>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, voluptas
        quae illum dolores accusantium cum eos hic iste quisquam ad fugit
        perspiciatis, laudantium impedit voluptatibus rem ut dolore id quis.
      </p>
      <Input
        type="text"
        placeholder="Create Post Category"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={
          "mt-2 focus:border-transparent focus:outline-transparent p-6 pl-8"
        }
        label=""
      />
      <Button
        className={
          "bg-green-700 p-3 text-white text-base rounded-lg self-start flex gap-3 items-center transition-all hover:bg-green-500"
        }
      >
        <PlusIcon className="w-6 text-white" />
        {loading ? "loading..." : "Update Post Category"}  
      </Button>
    </form>
  );
};

export default Updatecategory;
