import { useEffect, useRef } from "react";
import "../CustomInput/CustomInput.css";
import { useFetcher } from "react-router-dom";

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
  inputIsFocused,
}) => {
  const input = useRef(null);

  useEffect(() => {
    inputIsFocused ? input.current.focus() : input.current.blur();
  }, [inputIsFocused]);

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
        />
      </div>
    </div>
  );
};

export default CustomInput;
