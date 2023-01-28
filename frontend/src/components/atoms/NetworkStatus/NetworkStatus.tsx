import React, { useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";

// import { toast } from "react-toastify";

const NetworkStatusProps = {
  children: PropTypes.node.isRequired,
};

export default function NetworkStatus({
  children,
}: InferProps<typeof NetworkStatusProps>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window &&
        window.addEventListener(
          "your offline, please check your internet connection",
          function () {
            // toast.error("You are offline", {
            //   toastId: "offline-id",
            // });
            console.log("Offline..")
          }
        );

      window &&
        window.addEventListener("online", function () {
          // toast.success("You are back online", {
          //   toastId: "online-id",
          // });
          console.log("Online..")
        });
    }
    return () => {
      if (typeof window !== "undefined") {
        window &&
          window.removeEventListener(
            "your offline, please check your internet connection",
            function () {
              // toast.error("You are offline", {
              //   toastId: "offline-id",
              // });
            }
          );

        window &&
          window.removeEventListener("online", function () {
            // toast.success("You are back online", {
            //   toastId: "online-id",
            // });
          });
      }
    };
  }, []);
  return <div>{children}</div>;
}
