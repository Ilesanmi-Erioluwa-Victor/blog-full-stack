import React, { useState } from "react";
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
          <nav>
            
          </nav>
       </section>
    </div>
  )
}

export default Signup
