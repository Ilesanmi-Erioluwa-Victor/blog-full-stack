import React, { useState} from 'react'
import { Button, Input } from 'src/components/atoms'


const CreatePost = () => {
  const [inputs, setInputs ] = useState
  return (
    <div className='block relative w-full padding'>
      <div className='sec-flex '>
        <h2 className='self-center text-2xl font-bold'>Create Post</h2>
        <p className='self-center font-medium'>Create post, let's the world know who you are</p>
          <form className='sec-flex gap-5 w-6/12 m-auto p-3'>
           <Input type='text' 
           className='p-6'
            placeholder='Enter post title'
            fieldsetClass='w-full self-center mt-6'
           />
           <textarea placeholder='Enter post Content' className='w-full self-center border rounded-lg p-3 h-40'/>

           <Button className={"self-start px-10 py-4 rounded-lg text-white bg-green-800"}>Submit</Button>
          </form>
      </div>
    </div>
  )
}

export default CreatePost
