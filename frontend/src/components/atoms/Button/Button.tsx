import React, { Ref } from "react";
import PropTypes, { InferProps } from "prop-types";

const BtnProps = {
  onClick: PropTypes.func,
  classes: PropTypes.string,
  type: PropTypes.oneOf(["filled", "bordered"]),
  tag: PropTypes.elementType,
  children: PropTypes.node,
  text: PropTypes.string,
  color: PropTypes.string,
  
};

const ButtonComponent = (
  {
    classes,
    children,
    text,
    tag,
    ...restProps
  }: InferProps<typeof BtnProps>,
  ref: Ref<HTMLInputElement>
) => {
  let Tag = tag ? tag : "button";

  return (
    <Tag {...restProps} className={`${classes}`} ref={ref}>
      {text ? text : children}
    </Tag>
  );
};
const Button = React.forwardRef(ButtonComponent);

export default Button;