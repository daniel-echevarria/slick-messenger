import "../CustomInput/CustomInput.css";

const CustomInput = ({ type, fieldName, value, handleChange, placeholder }) => {
  return (
    <>
      <label>
        {fieldName}{" "}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </label>
    </>
  );
};

export default CustomInput;
