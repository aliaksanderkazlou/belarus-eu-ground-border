import React from "react";

interface CardProps {
  children: React.ReactNode;
  color?: "green" | "yellow" | "red";
}

const borderColorMap = {
  green: "border-green-600",
  yellow: "border-yellow-500",
  red: "border-red-600",
  default: "border-gray-300",
};

export const Card: React.FC<CardProps> = ({ children, color }) => {
  const borderClass = borderColorMap[color ?? "default"];

  return (
    <li className={`overflow-hidden rounded-xl shadow-sm bg-white border ${borderClass}`}>
      {children}
    </li>
  );
};

export default Card;