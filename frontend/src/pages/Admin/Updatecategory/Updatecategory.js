import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Input, Button } from "src/components/atoms";
import { deleteCategoryAction, updateCategoryAction, fetchCategoryAction } from "src/redux/Slices/Category/category";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const Updatecategory = () => {
  const { id } = useParams();
   const navigate = useNavigate();
     const dispatch = useDispatch();


    const categorystate = useSelector((state) => state?.category);
  const { serverError, category, loading, deletedCategory } = categorystate;
  const title = category?.title;
  // I want to populate my initial category title to my render title for update
  const [updateTitle, setUpdatetitle] = useState(title);


  // Get the category id
  useEffect( () =>{
    dispatch(fetchCategoryAction(id))
  },[dispatch, id])



  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    if (!updateTitle) {
       toast.error("Please, add post category!!!", {
        toastId: "post_category",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
     dispatch(updateCategoryAction({title, id}));

      if (deletedCategory?.user) {
       toast.error("You have succesfully deleted category!!!", {
        toastId: "create_post_category",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      navigate("/dashboard/category-list")
    }

    if (category?.user) {
       toast.success("You have succesfully Updated category!!!", {
        toastId: "create_post_category",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
       navigate("/dashboard/category-list")
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
        onChange={(e) => setUpdatetitle(e.target.value)}
        value={updateTitle}
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

        <Button
        onClick={() =>dispatch(deleteCategoryAction(id))}
        className={
          "bg-red-700 p-3 text-white text-base rounded-lg self-start flex gap-3 items-center transition-all"
        }
      >
        {loading ? "loading..." : "Delete Post Category"}  
      </Button>
    </form>
  );
};

export default Updatecategory;
