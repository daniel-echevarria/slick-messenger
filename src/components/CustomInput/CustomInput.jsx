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
}) => {
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
        />
      </div>
    </div>
  );
};

export default CustomInput;
