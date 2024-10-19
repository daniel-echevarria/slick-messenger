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
}) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        minLength={min}
      />
    </div>
  );
};

export default CustomInput;
