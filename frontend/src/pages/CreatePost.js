import React, { useState} from 'react'
import { Button, Input } from 'src/components/atoms'


const CreatePost = () => {
  const [inputs, setInputs ] = useState( {
    title : "",
    textarea : ""
  })

  const handleInputsChange = ev => {
    const name = ev.target.name;
    const value = ev.target.value;
    setInputs({
      ...inputs,[name] : value
    })
  }

  const handleSubmitCgange = ev => {
    ev.preventDefault();
    console.log({inputs})
  }

  return (
    <div className='block relative w-full padding'>
      <div className='sec-flex '>
        <h2 className='self-center text-2xl font-bold'>Create Post</h2>
        <p className='self-center font-medium'>Create post, let's the world know who you are</p>
          <form className='sec-flex gap-5 w-6/12 m-auto p-3' onSubmit={handleSubmitCgange}>
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
