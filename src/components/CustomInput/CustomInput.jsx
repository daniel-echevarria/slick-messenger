import { useEffect, useRef } from "react";
import "../CustomInput/CustomInput.css";

const CustomInput = ({
  label,
  type,
  value,
  handleChange,
  placeholder,
  required,
  min,
  disabled,
  id,
  setInputIsFocused,
}) => {
  const input = useRef(null);

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
          minLength={min}
          disabled={disabled}
          ref={input}
          onFocus={() => setInputIsFocused(true)}
          // onBlur={() => setInputIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default CustomInput;
