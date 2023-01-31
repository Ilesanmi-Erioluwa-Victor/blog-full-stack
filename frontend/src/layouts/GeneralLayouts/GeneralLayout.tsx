import React from "react";
import PropTypes, { InferProps } from "prop-types";
// import { useLocation } from "react-router-dom";
// import Footer from "components/molecules/Footer/Footer";
// import Navigation from "components/molecules/Navigation/Navigation";



const GeneralProps = {
  children: PropTypes.node.isRequired,
};

const GeneralLayout = ( {children} :InferProps<typeof GeneralProps>):JSX.Element => {

    return (
    <div className="w-full">
         <main>
         {children}
      </main>
    </div> )
}

export default GeneralLayout;
