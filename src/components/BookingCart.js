import moment from "moment";
import React from "react";

export const BookingCart = ({ booking, bgColor }) => {
  return (
    <div
      className={`flow-root first-line:w-full m-auto ${bgColor} dark:${bgColor} rounded-lg mb-6 dark:text-black`}
    >
      <div className="p-4 ">
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
              {booking.phone}
            </p>
            <p>
              <span className="font-bold">Services: </span>{" "}
              {booking.serviceName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
