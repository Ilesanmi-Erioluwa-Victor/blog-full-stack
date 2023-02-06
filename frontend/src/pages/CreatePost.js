import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Input } from 'src/components/atoms'
import Dropdown from 'src/components/atoms/Dropdown/Dropdown'
import { fetchCategoriesAction } from 'src/redux/Slices/Category/category'
import { createPostAction } from 'src/redux/Slices/Post/post'


const CreatePost = () => {
  const dispatch = useDispatch();

     useEffect( () => {
    dispatch(fetchCategoriesAction())
  }, [dispatch])

  const category = useSelector ( (state)=> state?.category);


 const allCategories = category?.categoryList?.map((items) => {
  console.log(items)
  return {
     label : items?.title,
     value :items?._id
  }
 })

   const value = allCategories?.[0]?.label;
   console.log(value)
  
  const [inputs, setInputs ] = useState( {
    title : "",
    textarea : ""
  })

  const [dropdownSelect, setDropdownSelect] = useState("");

  const handleInputsChange = ev => {
    const name = ev.target.name;
    const value = ev.target.value;
    setInputs({
      ...inputs,[name] : value
    })
  }

  const handleSubmitCgange = async (ev) => {
    ev.preventDefault();
    const { title, textarea } = inputs;
    if(!title || !textarea) {
      toast.error("Please, add Inputs text!!!", {
        toastId: "create_post.",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
    dispatch(createPostAction({title, description : textarea}))
  }



  return (
    <div className='block relative w-full padding'>
      <div className='sec-flex '>
        <h2 className='self-center text-2xl font-bold'>Create Post</h2>
        <p className='self-center font-medium'>Create post, let's the world know who you are</p>
          <form className='sec-flex gap-5 w-8/12 m-auto p-3' onSubmit={handleSubmitCgange}>
            <Dropdown options={allCategories} value={value}/>
           <Input type='text' 
           className='p-6'
            placeholder='Enter post title'
            name='title'
            value={inputs.title}
            onChange={handleInputsChange}
            fieldsetClass='w-full self-center mt-6'
           />
           <textarea placeholder='Enter post Content' 
           className='w-full self-center border rounded-lg p-3 h-40'
           name='textarea'
           value={inputs.textarea}
           onChange={handleInputsChange}
           />

           <Button className={"self-start px-10 py-4 rounded-lg text-white bg-green-800"}>Submit</Button>
          </form>
      </div>
    </div>
  )
}

export default CreatePost
