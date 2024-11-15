import { useEffect, useRef } from "react";
import "../CustomInput/CustomInput.css";

const CustomInput = ({
  label,
  type,
  value,
  handleChange,
  placeholder,
  required,
  minLength,
  disabled,
  onEnter,
  id,
  inputRef,
  autoFocus,
}) => {
  const handleEnterPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      onEnter();
    }
  };

  return (
    <div className="form-field">
      <label>{label}</label>
      <div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          disabled={disabled}
          onKeyDown={handleEnterPress}
          ref={inputRef}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};

export default CustomInput;
