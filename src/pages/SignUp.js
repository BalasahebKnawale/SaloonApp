import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { OAuth } from "../firebase/OAuth";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (formData.name.trim() === "" || formData.mobile.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
    if (!isValidMobileNumber(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    try {
      console.log("formData is", formData);
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      updateProfile(auth.currentUser, {
        displayName: formData.name,
        phoneNumber: formData.mobile,
      });

      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.role = "user";
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      console.log("User created with uid:", user);
      toast.success("DONE!");
      navigate("/");
    } catch (error) {
      toast.error("" + error.message);

      console.log(error);
    }
  };

  const isValidMobileNumber = (number) => {
    // Regular expression pattern for a 10-digit Indian mobile number
    const mobileNumberPattern = /^[0-9]{10}$/;

    return mobileNumberPattern.test(number);
  };

  return (
    <main className="flex flex-col items-center justify-items-center  bg-gray-100 dark:bg-gray-600 overflow-y-scroll">
      <div className="max-w-sm m-auto w-5/6">
        <h3 className="mb-2 text-center text-2xl font-bold text-black dark:text-white">
          Create an Account
        </h3>
        <form
          onSubmit={onFormSubmit}
          className="w-full m-auto p-4 bg-white dark:bg-gray-500 dark:text-gray-100 rounded-lg border-2"
        >
          <div className="mb-5">
            <label
              htmlFor="username-success"
              className="block mb-2 text-sm font-medium text-green-700 dark:text-white"
            >
              Your name
            </label>
            <input
              type="text"
              id="username-success"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-green-500 placeholder:text-gray-400 dark:placeholder:text-green-600"
              placeholder="Ram G"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-green-700 dark:text-white"
            >
              Email id
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-green-500 placeholder:text-gray-400 dark:placeholder:text-green-600"
              placeholder="Ram G"
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
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              className="bg-green-50 border border-green-500 text-green-950 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-green-500 placeholder:text-gray-400 dark:placeholder:text-green-600"
              placeholder="8888888888"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="pass"
              className="block mb-2 text-sm font-medium text-green-700 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="pass"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-green-50 border border-green-500 text-green-950 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-green-500 placeholder:text-gray-400 dark:placeholder:text-green-600"
            />
          </div>

          <button
            type="submit"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            SIGN UP
          </button>
          <div className="flex justify-center items-center my-4">
            <hr className="flex-grow bg-gray-300 dark:bg-gray-700 mx-2" />
            <p className="text-gray-500 dark:text-gray-300">or Continue With</p>
            <hr className="flex-grow bg-gray-300 dark:bg-gray-700 mx-2" />
          </div>
          <OAuth />
        </form>
      </div>
    </main>
  );
};
