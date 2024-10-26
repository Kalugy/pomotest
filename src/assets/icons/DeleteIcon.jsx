const DeleteIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={4}
    stroke={color}
    width={size}
    height={size}
    className="cursor-pointer transition duration-150 ease-in-out"
  >
    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
    <line x1="6" y1="18" x2="18" y2="6" strokeLinecap="round" />
  </svg>
  );
  
  export default DeleteIcon;