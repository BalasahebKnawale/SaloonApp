// ContactUs.js

import React from "react";

const ContactUs = () => {
  return (
    <main className="flex justify-center items-center w-full  h-[90vh] md:h-[88vh] bg-gray-100 dark:bg-gray-600">
      <div className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        {/* Contact Information Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <div className="flex items-center justify-center space-x-4">
            <div>
              <p className="text-lg font-semibold">Phone:</p>
              <p className="text-gray-600">(123) 456-7890</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Email:</p>
              <p className="text-gray-600">info@yoursalon.com</p>
            </div>
          </div>
        </section>

        {/* Contact Form Section (optional) */}
        {/* Replace with your contact form component if needed */}
        {/* <ContactForm /> */}
      </div>
    </main>
  );
};

export default ContactUs;
