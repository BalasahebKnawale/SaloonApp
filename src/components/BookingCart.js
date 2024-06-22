import moment from "moment";
import React from "react";
import { admin_mob } from "../CONSTANTS";

export const BookingCart = ({
  booking,
  bgColor,
  userType = "admin",
  handleCancel,
}) => {
  return (
    <div
      className={`p-4 ${bgColor} dark:${bgColor} rounded-lg mb-6 dark:text-black`}
    >
      <div>
        <div className="font-semibold">
          <span className="font-bold">Name: </span>
          {booking.name}
        </div>

        <div>
          <hr className="my-2" />
          <div>
            <p>
              <span className="font-bold">From: </span>
              {moment(booking.serviceStartsat).format("hh:mm A")}
            </p>
            <p>
              <span className="font-bold">To: </span>{" "}
              {moment(booking.serviceEndsat).format("hh:mm A")}
            </p>
            <p>
              <span className="font-bold">Mob: </span>
              {userType === "user" ? admin_mob : booking.phone}
            </p>
            <p>
              <span className="font-bold">Services: </span>{" "}
              {booking.serviceName}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-2">
        <button
          type="button"
          className="mx-auto text-white bg-gradient-to-br from-pink-600 to-orange-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => handleCancel({ id: booking.id })}
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};
