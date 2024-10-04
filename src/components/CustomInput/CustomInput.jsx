import "../CustomInput/CustomInput.css";

const CustomInput = ({
  label,
  name,
  type,
  value,
  handleChange,
  placeholder,
  required,
}) => {
  return (
    <>
      <label>
        {label}
        <input
          id={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
        />
      </label>
    </>
  );
};

export default CustomInput;
