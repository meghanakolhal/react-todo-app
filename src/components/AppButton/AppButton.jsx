// eslint-disable-next-line react/prop-types
const AppButton = ({ btnClickHandler, btnLabel, isDisabled, className }) => {
  return (
    <button
   
      onClick={btnClickHandler}
      disabled={isDisabled}
      className={className}
    >
      {btnLabel}
    </button>
  );
};
export default AppButton;
