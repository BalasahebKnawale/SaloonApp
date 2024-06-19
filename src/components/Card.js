import React from "react";

const Card = ({ title, description, imageUrl, icon, className, onClick }) => {
  // Define the base classes for the card
  const baseClasses = "bg-white rounded-lg shadow-lg overflow-hidden";

  // Combine base classes with additional className(s) if provided
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <div className={combinedClasses} onClick={onClick}>
      {imageUrl && !icon && (
        <img
          className="w-full h-40 object-cover object-center"
          src={imageUrl}
          alt="Card"
        />
      )}
      {icon && (
        <div className="w-full h-40 flex items-center justify-center">
          {icon}
        </div>
      )}
      {!imageUrl && !icon && (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          No Image or Icon
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
