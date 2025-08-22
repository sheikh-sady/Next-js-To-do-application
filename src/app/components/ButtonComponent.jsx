const ButtonComponent = ({ icon,type, label, onClick, properties }) => {
  return (
    <button
      type={type? type :"button"}
      onClick={onClick}
      className={`h-10 p-2.5 flex justify-center items-center gap-4 text-white rounded-md  hover:cursor-pointer ${properties}`}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
};
export default ButtonComponent;
