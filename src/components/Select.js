import React from "react";
import PropTypes from "prop-types";

const Select = (props) => {
  const { inputRef, id, label, labelSize, inputSize, lastRow, required, frmField, err, errMessage, values, ...others } =
    props;
  const inputClass = `form-select ${err ? "is-invalid" : ""}`;
  return (
    <div className={`row ${lastRow ? "" : "mb-3"}`}>
      <label htmlFor={id} className={`col-sm-${labelSize} col-form-label ${required ? "required" : ""}`}>
        {label}
      </label>
      <div className={`col-sm${inputSize ? "-" + inputSize : ""}`}>
        <select {...others} {...frmField} className={inputClass}>
          <option value="">-----</option>
          {values.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
      </div>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  labelSize: PropTypes.number,
};

Select.defaultProps = {
  labelSize: 3,
};

export default Select;
