const TagIcon = ({ color ,width, height}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      style={{ backgroundColor: color
      }}
      className= "p-2 w-10 h-10 rounded-xl"
    >
      <path d="M15 7.2 8.8 1a1.25 1.25 0 0 0-.88-.34h-6A1.25 1.25 0 0 0 .66 1.91v6A1.25 1.25 0 0 0 1 8.8L7.2 15a1.24 1.24 0 0 0 .88.36A1.28 1.28 0 0 0 9 15l6-6a1.27 1.27 0 0 0 0-1.8zm-6.9 6.89L1.91 7.92v-6h6l6.17 6.17z" />
      <ellipse cx="4.95" cy="4.95" rx="1.41" ry="1.5" />
    </svg>
  );
};
export default TagIcon;
