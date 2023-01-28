import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Signup = ():JSX.Element => {
    const [passwordFieldType, setPasswordFieldType] = useState<boolean>(false);

      const togglePasswordVisibility = () => {
    setPasswordFieldType(!passwordFieldType);
  };

  return (
    <div className="flex padding bg-orange-300 w[100%] relative">
       {/* First Section */}
       <section className="flex sec-flex">
          <nav className="sec-flex">
            <Link to={"/"}>
                <h3 className="text-xl text-orange-700 font-bold mb-[7rem]">Blog Platform</h3>
            </Link>
            <h2 className="text-2xl">Join Our blogging platform, to experience unlimited Resources.</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam aperiam unde nobis excepturi sed. Magnam?</p>
          </nav>
       </section>

       {/* Second Section */}
       <section>
        <h1>Hello from Prime</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quas eligendi repellat, perspiciatis est maxime, libero dolorum molestias cupiditate ab veritatis sunt tempora sit distinctio doloremque obcaecati, cumque voluptas in.</p>
       </section>
    </div>
  )
}

export default Signup
