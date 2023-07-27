// eslint-disable-next-line react/prop-types
const Input = ({
  inputChangeHandler,
  inputVal,
  keyDownHandler,
  placeholder,
  className
}) => {
  const inputHandler = (e) => {
    inputChangeHandler(e.target.value);
  };
  return (
    <input
      type="text"
      onChange={inputHandler}
      value={inputVal}
      onKeyUp={keyDownHandler}
      placeholder={placeholder}
      className={className}
    />
  );
};
export default Input;
