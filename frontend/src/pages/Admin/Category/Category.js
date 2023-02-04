import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesAction } from 'src/redux/Slices/Category/category'

const Category = () => {
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(getCategoriesAction())
  },[dispatch])
  
  return (
    <div>
      hello from Category
    </div>
  )
}

export default Category
