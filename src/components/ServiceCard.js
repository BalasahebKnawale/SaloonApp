import React from "react";
import Logo from "../assets/logo.png";

export const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white w-[150px] aspect-square shadow-lg rounded-full overflow-hidden flex flex-col justify-center items-center">
      <img src={Logo} className="w-16 h-16 mx-auto rounded-full" alt="logo" />
      <h3 className="font-bold text-lg">{service.serviceName}</h3>
    </div>
  );
};
