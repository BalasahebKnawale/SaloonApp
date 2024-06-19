import React from "react";
import { useCart } from "../context/CartContext";

export const ServiceComponent = ({ service }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();

  const handleAddToCart = () => {
    addToCart(service);
    console.log("Added to cart:", cartItems);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(service.id);
  };

  // Check if the service is already in the cart
  const isInCart = cartItems.some((item) => item.id === service.id);

  return (
    <>
      <li className="py-2">
        <div className="flex items-center">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {service.serviceName}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {service.description}
            </p>
          </div>
          <div className="inline-flex flex-col items-center text-base font-semibold text-gray-900 dark:text-white">
            ${service.price}
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {service.duration} min
            </p>
          </div>
        </div>

        {isInCart ? (
          <button
            className="p-1 text-white bg-red-700 hover:bg-red-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center dark:bg-red-600 dark:hover:bg-red-700 "
            onClick={handleRemoveFromCart}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="p-1 text-white bg-green-700 hover:bg-green-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-green-600 dark:hover:bg-green-700 "
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </li>
    </>
  );
};
