import React from "react";
import services from "../data/services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ServiceCard } from "../components/ServiceCard";
import Card from "../components/Card";
import { FcGallery } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const flattenServices = (data) => {
  return data.reduce((acc, category) => {
    return acc.concat(category.services);
  }, []);
};

const serviceList = flattenServices(services);

function Home() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true, // Ensure arrows are enabled

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <main className="flex flex-col items-center w-full h-[90vh] md:h-[88vh]  bg-gray-100 dark:bg-gray-600 p-4 overflow-y-auto">
      <h3 className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
        Welcome to My Salon
      </h3>
      <div className="w-11/12">
        {/* Container to center the carousel */}
        <Slider {...settings}>
          {serviceList.map((service) => (
            <div key={service.id} className="flex gap-2">
              <ServiceCard service={service} />
            </div>
          ))}
        </Slider>
        <div className="lg: w-11/12 md:w-[750px] flex justify-around my-20 mx-auto gap-2">
          <Card
            className="lg:w-1/3 md:w-2/5 flex flex-col items-center justify-center"
            title="Gallery"
            icon={<FcGallery size={200} />} // Replace with your image URL
          />
          <Card
            className="lg:w-1/3 md:w-2/5 flex flex-col items-center justify-center text-center hover:cursor-pointer"
            title="Book Appointment"
            icon={<FcCalendar size={200} />} // Replace with your image URL
            onClick={() => {
              console.log("Booking clicked");
              return navigate("/services");
            }}
          />
        </div>
        <div className="lg: w-11/12 md:w-[750px] flex justify-around my-20 mx-auto gap-2">
          <Card
            className="lg:w-1/3 md:w-2/5 flex flex-col items-center justify-center text-center hover:cursor-pointer"
            title="My Bookings"
            icon={<FcBusinessman size={200} />} // Replace with your image URL
            onClick={() => {
              return navigate("/userbooking");
            }}
          />
          <Card
            className="lg:w-1/3 md:w-2/5 flex flex-col items-center justify-center"
            title="My Offers"
            icon={<FcCalendar size={200} />} // Replace with your image URL
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
