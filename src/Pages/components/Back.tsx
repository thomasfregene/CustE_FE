import React from "react";
import { useNavigate } from "react-router-dom";

const Back: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleBackClick}
      className="flex items-center space-x-2 text-black focus:outline-none"
    >
      <i className="fas fa-arrow-left text-black"></i>
      <span>Back</span>
    </button>
  );
};

export default Back;
