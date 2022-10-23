import React from "react";
import PropTypes from "prop-types";
import Validators from "./../helpers/propTypeValidators";
const Input = (props) => {
  const {
    type = "text",
    inputRef,
    id,
    label,
    labelSize = 3,
    inputSize,
    required = false,
    lastRow = false,
    frmField,
    errMessage,
    ...others
  } = props;
  const labelClass = `col-sm-${labelSize} col-form-label ${required ? "required" : ""}`;
  const inputClass = `form-control ${errMessage ? "is-invalid" : ""}`;
  return (
    <div className={`row ${lastRow ? "" : "mb-3"}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className={`col-sm${inputSize ? "-" + inputSize : ""}`}>
        {others["rows"] > 1 ? (
          <textarea ref={inputRef} id={id} {...others} {...frmField} className={inputClass}></textarea>
        ) : (
          <input type={type} ref={inputRef} id={id} {...others} {...frmField} className={inputClass} />
        )}
        {errMessage ? <div className="invalid-feedback">{errMessage}</div> : ""}
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["text", "email", "url", "password", "tel", "search", "number"]),
  inputRef: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string.isRequired,
  labelSize: Validators.numberBetween(1, 12),
  lastRow: PropTypes.bool,
  required: PropTypes.bool,
  frmField: PropTypes.object,
  errMessage: PropTypes.string,
  rows: PropTypes.number,
};

export default Input;
