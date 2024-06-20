import React, { useState } from "react";
import services from "../data/services";
import Logo from "../assets/logo.png";
import { ServiceComponent } from "../components";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const ServiceList = () => {
  const servicesList = services;
  const [openCategory, setOpenCategory] = useState(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const handleCategoryToggle = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  console.log(cartItems);

  return (
    <main className="flex flex-col items-center justify-items-center  bg-gray-100 dark:bg-gray-600  overflow-y-scroll">
      <div className="max-w-sm  w-5/6 ">
        <div className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
          Select Service
        </div>
        <div className="flow-root  w-full m-auto p-4 bg-white dark:bg-gray-500 dark:text-gray-100 rounded-lg border-2 over">
          <ul
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {servicesList.map((category) => (
              <li key={category.category} className="py-3 sm:py-4">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleCategoryToggle(category.category)}
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={Logo}
                      alt="Bonnie"
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {category.category}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {category.services.length} Services
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {openCategory === category.category ? "Close" : "View"}
                  </div>
                </div>
                {openCategory === category.category && (
                  <ul className="mt-2 ml-4">
                    {category.services.map((service) => (
                      <ServiceComponent
                        key={service.serviceName}
                        service={service}
                      />
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="fixed bottom-16 left-0 right-0 flex justify-center">
        {cartItems.length > 0 && (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => navigate("/book")}
          >
            Done
          </button>
        )}
      </div>
    </main>
  );
};

export default ServiceList;
