import React from "react";

function Delayed({ children, wait = 500 }) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeOut = window.setTimeout(() => {
      setShow(true);
    }, wait);

    return () => window.clearTimeout(timeOut);
  });

  return show === true ? children : null;
}

 const Loading = () => {
  return (
    <Delayed>
      <div className="loading center"></div>;
    </Delayed>
  );
};

export default Loading
