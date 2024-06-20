import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCart } from "../context/CartContext";
import moment from "moment/moment";
import { end_time, slotDuration, start_time } from "../CONSTANTS";

import { query } from "firebase/database";
import { addDoc, collection, getDocs, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const BookingForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [serviceEndsat, setServiceEndsat] = useState(null);
  const [serviceStartsat, setServiceStartsat] = useState(null);

  const [timeSlots, setTimeSlots] = useState([]);
  // Define time slots
  const navigate = useNavigate();

  const { cartItems: service, totalTime } = useCart();
  const handleBookService = (e) => {
    e.preventDefault();
    // Validate form data
    if (
      name.trim() === "" ||
      mobile.trim() === "" ||
      !selectedDate ||
      selectedTime === ""
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!isValidMobileNumber(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    bookinHandler(e);
  };

  const bookinHandler = async (e) => {
    console.log(service);
    const serviceNameList = service.map((service) => service.serviceName);
    const allServices = serviceNameList.join(", ");

    const bookingData = {
      serviceName: allServices,
      name,
      mobile,
      selectedDate: moment(selectedDate).format("DD/MM/YYYY"),

      selectedTime: selectedTime.join(", "),
      serviceStartsat,
      serviceEndsat,
    };
    try {
      await addDoc(collection(db, "bookings"), bookingData);
      toast.success("Booking successful!", {
        onClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      toast.error("Something went wrong! try again", {
        onClose: () => {
          navigate("/");
        },
      });
    }

    setBookingDetails(bookingData);
    console.log(bookingData);
  };
  const setTimehandler = (slot, totalTime) => {
    let selectedSlots = [];
    let startTime = moment(slot, "hh:mm A");
    let endTime = moment(slot, "hh:mm A").add(totalTime, "minutes");
    let currentdate = moment(selectedDate);
    currentdate.set({
      hour: startTime.hours(),
      minute: startTime.minutes(),
      second: 0,
      millisecond: 0,
    });

    setServiceStartsat(currentdate.valueOf());
    currentdate.set({
      hour: endTime.hours(),
      minute: endTime.minutes(),
      second: 0,
      millisecond: 0,
    });

    setServiceEndsat(currentdate.valueOf());

    while (startTime.isBefore(endTime)) {
      selectedSlots.push(startTime.format("hh:mm A"));
      // console.log(selectedSlots);
      startTime.add(slotDuration, "minutes");
    }

    setSelectedTime(selectedSlots);
  };

  const isValidMobileNumber = (number) => {
    // Regular expression pattern for a 10-digit Indian mobile number
    const mobileNumberPattern = /^[0-9]{10}$/;

    return mobileNumberPattern.test(number);
  };

  useEffect(() => {
    let startTime = moment(start_time, "hh:mm A");
    let endTime = moment(end_time, "hh:mm A");

    const slotuptate = async () => {
      console.log("selectedDate is changed to ", selectedDate);
      if (selectedDate) {
        try {
          console.log("started to fetch booking Details");
          const usersRef = collection(db, "bookings");
          const q = query(
            usersRef,
            where(
              "selectedDate",
              "==",
              moment(selectedDate).format("DD/MM/YYYY")
            )
          );

          const snapshot = await getDocs(q);

          const bookedSlots = [];

          snapshot.forEach((childSnapshot) => {
            // console.log("childSnapshot is ", childSnapshot);
            const bookingData = childSnapshot.data();
            const bookedTime = bookingData.selectedTime;
            // console.log("Booked Time :", bookedTime);
            // console.log("User is :", bookingData.name);
            const bufferstart = moment(bookingData.serviceStartsat).subtract(
              totalTime,
              "minutes"
            );
            while (bufferstart.isBefore(bookingData.serviceStartsat)) {
              bookedSlots.push(bufferstart.format("HH:mm"));
              bufferstart.add(slotDuration, "minutes");
            }
            bookedTime.split(",").forEach((time) => {
              bookedSlots.push(moment(time.trim(), "HH:mm A").format("HH:mm"));
            });
          });

          // console.log("Booked Slots:", bookedSlots);

          const availableSlots = timeSlots.filter(
            (slot) => !bookedSlots.includes(slot)
          );
          // console.log("Available Slots:", availableSlots);

          setTimeSlots(availableSlots);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        let timeSlots2 = [];
        while (startTime < endTime) {
          timeSlots2.push(startTime.format("HH:mm"));
          //  console.log(timeSlots2);
          startTime.add(slotDuration, "minutes");
        }
        // console.log(timeSlots2);
        setTimeSlots(timeSlots2);
      }
    };
    slotuptate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    if (!service || service.length < 1) {
      toast.error("Please select a service", {
        onClose: () => {
          navigate("/services");
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col items-center justify-items-center  bg-gray-100 dark:bg-gray-600 overflow-y-scroll">
      <div className="max-w-sm m-auto w-5/6 ">
        <h3 className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
          Book your slot
        </h3>
        <form
          onSubmit={handleBookService}
          className="w-full m-auto p-4 bg-white dark:bg-gray-500 dark:text-gray-100 rounded-lg border-2 mb-10 "
        >
          <div className="mb-5">
            <label
              htmlFor="username-success "
              className="block mb-2 text-sm font-medium text-green-700 dark:text-white"
            >
              Your name
            </label>
            <input
              type="text"
              id="username-success"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-green-500 placeholder:text-gray-400 dark:placeholder:text-green-600"
              placeholder="Bonnie Green"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="mobileno"
              className="block mb-2 text-sm font-medium text-green-700 dark:text-white"
            >
              Mobile No
            </label>
            <input
              type="text"
              id="mobileno"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="bg-green-50 border border-green-500 text-green-950 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-green-500 placeholder:text-gray-400 dark:placeholder:text-green-600"
              placeholder="8888888888"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-green-700 dark:text-white"
            >
              Date
            </label>
            <DatePicker
              id="date"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                // updateSlotsAvialable();
              }}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              isClearable
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-green-500 min-w-5/6 "
              required
            />
          </div>
          <div
            className="mb-5
        bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-green-500 min-w-5/6"
          >
            <label className="block mb-8 text-sm font-medium text-green-700 dark:text-green-500 text-center ">
              Select your time slot
            </label>

            <div className="flex gap-2 flex-wrap justify-around h-[200px] overflow-y-scroll">
              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  className={`w-[40px] max-w-[50px] h-[50px] text-center text-white cursor-pointer bg-slate-500  rounded-xl border border-solid border-black ${
                    selectedTime.includes(
                      moment(slot, "HH:mm").format("hh:mm A")
                    )
                      ? "bg-slate-700 "
                      : ""
                  }`}
                  onClick={() => setTimehandler(slot, totalTime)}
                >
                  {moment(slot, "HH:mm").format("hh:mm A")}
                </div>
              ))}
            </div>
          </div>
          <div class="flex justify-center items-center">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
           type="submit">Book Service</button>
           </div>
        </form>
      </div>
      {/* {bookingDetails && (
        <div className="booking-details">
          <h4>Your Booking Details:</h4>
          <p>Name: {bookingDetails.name}</p>
          <p>Mobile: {bookingDetails.mobile}</p>
          <p>Date: {bookingDetails.selectedDate}</p>
          <p>Time Slot: {bookingDetails.selectedTime}</p>
        </div>
      )} */}
    </main>
  );
};
