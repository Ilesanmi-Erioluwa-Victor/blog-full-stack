import React from "react"
import  { Link } from "react-router-dom"
import ErrorImg from "src/assets/authentication/errorpage.svg" 
import { Button } from "src/components/atoms";
import { Icon } from "src/utils";


type ErrorMessage = Record<
  number,
  {
    errorTitle?: String;
    errorMessage: String;
    errorMessageTwo?: String;
  }
>;

const ErrorPage = (props: { statusCode: number }) => {
  const statusCode = props.statusCode;

  const errorMessages: ErrorMessage = {
    404: {
      errorTitle: "",
      errorMessage:
        "It's a 404. Unfortunately we couldn't find what you're looking for.",
    },
    405: {
      errorTitle: "Uhmm....",
      errorMessage:
        "We couldn't find the page you're looking for. It's either the link is broken or the page has been moved",
    },
  };

  const errorMessageToShow = errorMessages[statusCode];

  return (
    <>
      <div className=" mx-10">
        <div className="flex flex-col items-center py-20">
          <div className="items-center">
            <Icon
              src={ErrorImg}
              alt={"Error photo" }
              className={"items-center" }
            />
          </div>
          <div className={`sec-flex text-center w-10/12 lg:w-6/12`}>
            <p className="text-2xl my-5">{errorMessageToShow.errorTitle}</p>
            <p className="text-xl font-semibold">{errorMessageToShow.errorMessage}</p>
          </div>
          <Link to="/">
            <Button 
            className={`border-primary_green border rounded-md 
            text-primary_green w-[100] md:w-[100%] lg:w-[100%]
             p-4 mt-5 bg-yellow-500 text-white font-semibold transition-all hover:bg-orange-500`}>
              Take me home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;