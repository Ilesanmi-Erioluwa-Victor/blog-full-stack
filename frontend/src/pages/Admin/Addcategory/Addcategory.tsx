import React, { useState } from "react";
import { Input } from "src/components/atoms";

const Addcategory = () => {
  const [title, setTitle] = useState<string>("");
  return (
    <Input
      type="text"
      placeholder="Create category"
      onChange={(e: any) => setTitle(e.target.value)}
      value={title}
      className={"mt-2 focus:border-transparent focus:outline-transparent p-6 pl-8"}
      label=""
    />
  );
};

export default Addcategory;
