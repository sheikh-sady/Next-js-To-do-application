const ButtonComponent = ({ icon, label, onClick, properties }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 p-2.5 flex justify-center gap-4 text-white font-medium rounded-md  hover:cursor-pointer ${properties}`}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
};
export default ButtonComponent;
