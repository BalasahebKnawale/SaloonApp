import React, { useEffect, useState } from "react";

import "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { query } from "firebase/database";
import { BookingCart } from "../components/BookingCart";

const UserBookings = () => {
  const [bookingDate, setBookingDate] = useState("");
  const [allbookings, setAllbookings] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleServices = () => {
    navigate("/services");
  };
  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        try {
          console.log("started to fetch booking Details");
          const usersRef = collection(db, "bookings");
          const q = query(usersRef, where("userId", "==", user.uid));

          const snapshot = await getDocs(q);

          console.log("user id is: ", user.uid);
          snapshot.forEach((childSnapshot) => {
            setAllbookings((prev) => [...prev, childSnapshot.data()]);
          });
        } catch (error) {
          console.log("Error fetching booking data: ", error);
        }
      }
    };
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("All bookings:", allbookings);
  const groupedBookings = allbookings
    .map((doc) => ({
      id: doc.id,
      selectedDate: doc.selectedDate,
      name: doc.name,
      phone: doc.mobile,
      serviceStartsat: doc.serviceStartsat,
      serviceEndsat: doc.serviceEndsat,
      serviceName: doc.serviceName,
    }))
    .reduce((acc, booking) => {
      acc[booking.selectedDate] = acc[booking.selectedDate] || [];
      acc[booking.selectedDate].push(booking);
      return acc;
    }, {});
  const bookingDayHandler = (selectedDate, booking) => {
    setBookingDate(selectedDate === bookingDate ? "" : selectedDate);
    console.log("Booking day clicked:", selectedDate);
    console.log("All bookings for the selected day:", booking[0].selectedDate);
  };

  return (
    <main className="flex flex-col items-center justify-items-center bg-gray-100 dark:bg-gray-600 overflow-y-scroll">
      <div className="max-w-6xl w-5/6">
        <div className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
          My Bookings
        </div>
        <div className="flow-root w-full m-auto p-4 bg-white dark:bg-gray-500 dark:text-gray-100 rounded-lg border-2 over">
          {Object.entries(groupedBookings).map(([selectedDate, bookings]) => (
            <div key={selectedDate} className="mb-6">
              <div
                className="mb-2 text-lg font-bold text-black dark:text-white hover:cursor-pointer border-b-2 border-gray-300 dark:border-gray-500"
                onClick={() => bookingDayHandler(selectedDate, bookings)}
              >
                {selectedDate}
              </div>
              {bookingDate === selectedDate && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-around">
                  {bookings.map((booking, index) => (
                    <BookingCart
                      key={booking.id}
                      booking={booking}
                      bgColor="bg-green-500 "
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="mt-10 max-w-sm mx-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={handleServices}
        >
          Book Service
        </div>
      </div>
    </main>
  );
};

export default UserBookings;
