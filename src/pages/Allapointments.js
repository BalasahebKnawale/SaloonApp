import React, { useEffect, useState } from "react";
import { BookingCart } from "../components/BookingCart";
import { useApi } from "../hooks/useApi";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function Allapointments() {
  const [bookingDate, setBookingDate] = useState("");
  const [allbookings, setAllbookings] = useState([]);

  const { loading, getData } = useApi();

  useEffect(() => {
    const getAllBookings = async () => {
      try {
        const res = await getData("bookings");

        if (res) {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const bookings = res
            .filter((doc) => {
              const selectedDate = doc.data().selectedDate;
              const [day, month, year] = selectedDate.split("/").map(Number);
              const date = new Date(year, month - 1, day); // month is 0-indexed

              console.log("selected date is: ", date.getTime());
              date.setHours(0, 0, 0, 0);

              return date.getTime() >= currentDate;
            })
            .map((doc) => ({
              //filter the appointments by date

              // ...doc.data(),
              id: doc.id,
              selectedDate: doc.data().selectedDate,
              name: doc.data().name,
              phone: doc.data().mobile,
              serviceStartsat: doc.data().serviceStartsat,
              serviceEndsat: doc.data().serviceEndsat,
              serviceName: doc.data().serviceName,
            }));
          setAllbookings(bookings);
        }
      } catch (error) {
        console.error("Error getting documents:", error);
      }
    };
    getAllBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const bgColors = [
    "bg-pink-200",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-200",
  ];
  console.log(allbookings);
  const groupedBookings = allbookings.reduce((acc, booking) => {
    acc[booking.selectedDate] = acc[booking.selectedDate] || [];
    acc[booking.selectedDate].push(booking);
    return acc;
  }, {});
  console.log(groupedBookings[0]);

  const bookingDayHandler = (selectedDate, booking) => {
    setBookingDate(selectedDate === bookingDate ? "" : selectedDate);
    console.log("Booking day clicked:", selectedDate);
    console.log("All bookings for the selected day:", booking[0].selectedDate);
  };
  const handleCancel = ({ id }) => {
    console.log("Cancelling booking with id:", id);
    if (!id) {
      console.error("Booking id is undefined");
      toast.error("Something went wrong! Booking ID is missing.");
      return;
    }

    const bookingRef = doc(db, "bookings", id);
    deleteDoc(bookingRef)
      .then(() => {
        toast.warn("Booking cancelled successfully");
        console.log("Booking deleted successfully");
        // Remove the cancelled booking from the state
        setAllbookings((prev) => prev.filter((booking) => booking.id !== id));
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.log("Error deleting booking:", error);
      });
  };

  return (
    <main className="flex flex-col items-center justify-items-center bg-gray-100 dark:bg-gray-600 overflow-y-scroll  h-[90vh] md:h-[88vh]">
      <div className="max-w-6xl w-5/6">
        <div className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
          All Bookings
        </div>
        <div className="flow-root mx-4 w-full m-auto p-4 bg-white dark:bg-gray-500 dark:text-gray-100 rounded-lg border-2 over">
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
                      bgColor={bgColors[index % bgColors.length]}
                      handleCancel={handleCancel}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
