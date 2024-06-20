import React from "react";
import Logo from "../assets/logo.png";

export const ServiceCard = ({ service }) => {
  return (
    <section className="ml-5">
    <div className="bg-green-500 w-[120px] aspect-square shadow-lg rounded-full overflow-hidden flex flex-col justify-around items-center">
      <img src={Logo} className="w-16 h-16 mx-auto rounded-full" alt="logo" />
      <h3 className="font-bold ">{service.serviceName}</h3>
    </div>
    </section>
  );
};
