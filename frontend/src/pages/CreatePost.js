import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Input } from 'src/components/atoms';
import Dropdown from 'src/components/atoms/Dropdown/Dropdown';
import { fetchCategoriesAction } from 'src/redux/Slices/Category/category';
import { createPostAction } from 'src/redux/Slices/Post/post';
import { Circles } from 'react-loader-spinner';
import DropzoneImage from 'src/components/atoms/Dropzone/Dropzone';

const CreatePost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const categoryState = useSelector((state) => state?.category);
  const loading = categoryState?.loading;

  const allCategories = categoryState?.categories?.map((items) => {
    return {
      label: items?.title,
      value: items?._id,
    };
  });

  const value = allCategories?.[0]?.label;

  const [inputs, setInputs] = useState({
    title: '',
    textarea: '',
  });

  const [img, setImg] = useState('');
  const [dropdownSelect, setDropdownSelect] = useState('');

  const handleInputsChange = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmitChange = async (ev) => {
    ev.preventDefault();
    const { title, textarea } = inputs;

    console.log(img.path);

    if (!title || !textarea || !dropdownSelect || !img) {
      return toast.error('Please, add Inputs text!!!', {
        toastId: 'create_post.',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    } else {
      dispatch(
        createPostAction({
          title,
          description: textarea,
          category: dropdownSelect?.label,
          image: img?.path,
        })
      );

      setInputs({
        title: '',
        textarea: '',
      });
      setDropdownSelect('');
      setImg('');
      return toast.success('Post created successfully', {
        toastId: 'create_post_success.',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

  //  const { getRootProps, getInputProps } = useDropzone({
  //   accept: {
  //     "image/*": [".jpeg", ".png", ".svg"],
  //   },
  //   onDrop: (acceptedFiles) => {
  //     acceptedFiles.map((file) => {
  //       console.log(file)
  //       setImg(URL.createObjectURL(file));
  //       const formData = new FormData();
  //       formData.append("Post picture", file);
  //       // dispatch(imgUploadAction({ imgURL, formData }));
  //     });
  //   },
  // });

  return (
    <>
      {loading ? (
        <>
          <div className='flex justify-center items-center h-screen'>
            <Circles
              height='80'
              width='80'
              color='#4fa94d'
              ariaLabel='circles-loading'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
          </div>
        </>
      ) : (
        <>
          <div className='block relative w-full padding'>
            <div className='sec-flex '>
              <h2 className='self-center text-2xl font-bold'>Create Post</h2>
              <p className='self-center font-medium'>
                Create post, let's the world know who you are
              </p>
              <form
                className='sec-flex gap-5 w-8/12 m-auto p-3'
                onSubmit={handleSubmitChange}
              >
                <Dropdown
                  options={allCategories}
                  value={value}
                  onChange={setDropdownSelect}
                  name={'select'}
                  // defaultValue={inputs.select}
                />

                {/* Post Img */}
                <DropzoneImage
                  setImg={setImg}
                  img={img}
                />

                <Input
                  type='text'
                  className='p-6'
                  placeholder='Enter post title'
                  name='title'
                  value={inputs.title}
                  onChange={handleInputsChange}
                  fieldsetClass='w-full self-center mt-6'
                />
                <textarea
                  placeholder='Enter post Content'
                  className='w-full self-center border rounded-lg p-3 h-40'
                  name='textarea'
                  value={inputs.textarea}
                  onChange={handleInputsChange}
                />

                <Button
                  className={
                    'self-start px-10 py-4 rounded-lg text-white bg-green-800'
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
