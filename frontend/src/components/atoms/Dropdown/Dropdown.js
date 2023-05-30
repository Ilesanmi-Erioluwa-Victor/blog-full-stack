import React from "react";
import Select from "react-select";

const Dropdown = ({ options, onChange, name, defaultValue }) => {
  return (
    <div>
      <Select
        options={options}
        onChange={onChange}
        placeholder="Select Post Category.."
        name={name}
        // defaultValue={defaultValue}
      />
    </div>
  );
};

export default Dropdown;
