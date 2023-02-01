import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Input, Button } from "src/components/atoms";


const Addcategory = (): JSX.Element => {
    const [title, setTitle] = useState<string>("");

const handleFormSubmit = (ev :any) => {
  ev.preventDefault();
  if(!title) {
    return toast.error("Please, add post category!!!", {
              toastId: "post_category",
                position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
            });
  }
}


  return (
    <form className="sec-flex" onSubmit={handleFormSubmit}>
      <h3>Add New Post Category</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, voluptas
        quae illum dolores accusantium cum eos hic iste quisquam ad fugit
        perspiciatis, laudantium impedit voluptatibus rem ut dolore id quis.
      </p>
      <Input
        type="text"
        placeholder="Create Post Category"
        onChange={(e: any) => setTitle(e.target.value)}
        value={title}
        className={
          "mt-2 focus:border-transparent focus:outline-transparent p-6 pl-8"
        }
        label=""
      />
      <Button
        className={
          "bg-green-700 p-3 text-white text-base rounded-lg self-start flex gap-3 items-center transition-all hover:bg-green-500"
        }
      >
        <PlusIcon className="w-6 text-white" />
        Add Post Category
      </Button>
    </form>
  );
};

export default Addcategory;
