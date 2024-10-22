import "../CustomInput/CustomInput.css";

const CustomInput = ({
  label,
  name,
  type,
  value,
  handleChange,
  placeholder,
  required,
  min,
  disabled,
}) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <div>
        <input
          id={name}
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
