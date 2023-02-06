import React from 'react'
import Select from "react-select";

const Dropdown = ({options, onChange, }) => {
  return (
    <div>
       <Select 
       options={options}
       onChange={onChange}
       placeholder= "Select Post Category.."
       />
    </div>
  )
}

export default Dropdown
