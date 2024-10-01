import "../CustomInput/CustomInput.css";

const CustomInput = ({ fieldName, value, handleChange, placeholder }) => {
  return (
    <>
      <label>
        {fieldName}{" "}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </label>
    </>
  );
};

export default CustomInput;
