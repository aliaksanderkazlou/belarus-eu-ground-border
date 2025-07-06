import React from "react";

interface CardShellProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardShellProps> = ({ children }) => {
  return (
    <li className="overflow-hidden rounded-xl border border-gray-300 shadow-sm bg-white">
      {children}
    </li>
  );
};

export default Card;