const EditIcon = ({ size = 24, color = "currentColor" }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M11 4h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" />
      <path d="M18.5 2.5l-10 10L7 17l4.5-1.5 10-10-3-3z" />
    </svg>
  );
  
  export default EditIcon;