import React from "react";

interface ButtonProps {
  children: string;
  type?: "button" | "submit" | "reset"; // Optional prop with limited string values
  bgColor?: string; // Optional prop for background color
  textColor?: string; // Optional prop for text color
  className?: string; // Optional prop for additional class names
  onClick?: () => void;
}

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
