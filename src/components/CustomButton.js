import React from "react";
import { Spinner } from "react-bootstrap";
const CustomButton = (props) => {
  const { color, className, onClick, isLoading = false, ...others } = props;
  const btnClass = `btn btn-${color} ${className}`;
  return (
    <button type="button" onClick={onClick} className={btnClass} {...others}>
      {isLoading ? <Spinner animation="border" role="status" size="sm" className="me-1" /> : ""}
      {props.children}
    </button>
  );
};

export default CustomButton;
