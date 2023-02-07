import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Button, Input } from "src/components/atoms";
import Dropdown from "src/components/atoms/Dropdown/Dropdown";
import { fetchCategoriesAction } from "src/redux/Slices/Category/category";
import { createPostAction } from "src/redux/Slices/Post/post";
import { Circles } from "react-loader-spinner";
import { Icon } from "src/utils";


const CreatePost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const categoryState = useSelector((state) => state?.category);
  const loading = categoryState?.loading;

  const allCategories = categoryState?.categoryList?.map((items) => {
    return {
      label: items?.title,
      value: items?._id,
    };
  });

  const value = allCategories?.[0]?.label;

  const [inputs, setInputs] = useState({
    title: "",
    textarea: "",
  });

  const [img , setImg ] = useState("");
  const [dropdownSelect, setDropdownSelect] = useState("");

  const handleInputsChange = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmitCgange = async (ev) => {
    ev.preventDefault();
    const { title, textarea } = inputs;

       console.log({img})

    if (!title || !textarea || !dropdownSelect) {
      return toast.error("Please, add Inputs text!!!", {
        toastId: "create_post.",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    } else {
      dispatch(
        createPostAction({
          title,
          description: textarea,
          category: dropdownSelect?.label,
        })
      );
 setInputs({
      title: "",
      textarea: "",
    });
    setDropdownSelect("");

    }
  };

   const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".svg"],
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) => {
        console.log(file)
        setImg(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append("Post picture", file);
        // dispatch(imgUploadAction({ imgURL, formData }));
      });
    },
  });

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </>
      ) : (
        <>
          <div className="block relative w-full padding">
            <div className="sec-flex ">
              <h2 className="self-center text-2xl font-bold">Create Post</h2>
              <p className="self-center font-medium">
                Create post, let's the world know who you are
              </p>
              <form
                className="sec-flex gap-5 w-8/12 m-auto p-3"
                onSubmit={handleSubmitCgange}
              >
                <Dropdown
                  options={allCategories}
                  value={value}
                  onChange={setDropdownSelect}
                  name={"select"}
                  defaultValue={inputs.select}
                />

                {/* Post Img */}
       {!img && (
        <div
          className="py-16 md:py-24 px-12 border-2 border-gray-500 border-dashed rounded-md mb-8"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="text-center">
            Drag & drop your files here or
            <span className="font-semibold underline cursor-pointer">
              browse
            </span>
          </p>
        </div>
      )}
      {img && (
        <div className="flex flex-col sm:flex-row gap-8 md:gap-24 md:pl-4 items-center py-2 mb-0">
          <div className="rounded-lg overflow-hidden shadow-sm shadow-indigo-200 w-full relative">
            <Icon
              src={img}
              alt="profile pic"
            />
            <div
              className="absolute bottom-1 right-2 bg-indigo-500 bg-opacity-50 p-1 rounded-md cursor-pointer"
              {...getRootProps()}
            >
              <ArrowUpTrayIcon className="w-6 text-slate-100" />
            </div>
          </div>
        </div>
      )} 

                <Input
                  type="text"
                  className="p-6"
                  placeholder="Enter post title"
                  name="title"
                  value={inputs.title}
                  onChange={handleInputsChange}
                  fieldsetClass="w-full self-center mt-6"
                />
                <textarea
                  placeholder="Enter post Content"
                  className="w-full self-center border rounded-lg p-3 h-40"
                  name="textarea"
                  value={inputs.textarea}
                  onChange={handleInputsChange}
                />

                <Button
                  className={
                    "self-start px-10 py-4 rounded-lg text-white bg-green-800"
                  }
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreatePost;
