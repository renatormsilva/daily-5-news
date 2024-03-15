import React, { useState } from "react";
import "./forminput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, type, options, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() => setFocused(true)}
          focused={focused.toString()}
          className="selectInput"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() => setFocused(true)}
          focused={focused.toString()}
        />
      );
    }
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      {renderInput()}
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
