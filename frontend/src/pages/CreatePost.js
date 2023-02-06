import React from 'react'
import { Input } from 'src/components/atoms'


const CreatePost = () => {
  return (
    <div className='block relative w-full padding'>
      <div className='sec-flex '>
        <h2 className='self-center text-2xl font-bold'>Create Post</h2>
        <p className='self-center font-medium'>Create post, let's the world know who you are</p>
          <form className='sec-flex gap-5'>
           <Input type='text' 
           className='p-6'
            placeholder='Enter post title'
            fieldsetClass='w-6/12 self-center mt-6'
           />
           <textarea placeholder='Enter post Content' className='w-6/12 self-center border rounded-lg p-3 h-40'/>
          </form>
      </div>
    </div>
  )
}

export default CreatePost
