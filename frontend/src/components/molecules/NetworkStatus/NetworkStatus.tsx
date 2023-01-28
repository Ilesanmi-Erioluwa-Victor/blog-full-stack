import React, { useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";

import { toast } from "react-toastify";

const NetworkStatusProps = {
  children: PropTypes.node.isRequired,
};

export default function NetworkStatus({ children }: InferProps <typeof NetworkStatusProps >) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window &&
        window.addEventListener(
          "your offline, please check your internet connection",
          function (e) {
            toast.error("You are offline", {
              toastId: "offline-id",
            });
          }
        );

      window &&
        window.addEventListener("online", function (e) {
          toast.success("You are back online", {
            toastId: "online-id",
          });
        });
    }
    return () => {
      if (typeof window !== "undefined") {
        window &&
          window.removeEventListener(
            "your offline, please check your internet connection",
            function (e) {
              toast.error("You are offline", {
                toastId: "offline-id",
              });
            }
          );

        window &&
          window.removeEventListener("online", function (e) {
            toast.success("You are back online", {
              toastId: "online-id",
            });
          });
      }
    };
  }, []);
  return <div>{children}</div>;
}
