import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import { OAuth } from "../firebase/OAuth";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSignIn = async (e) => {
    e.preventDefault();
    console.log("Logging in");
    try {
      // Validate form data
      if (formData.email.trim() === "" || formData.password.trim() === "") {
        alert("Please fill in all fields.");
        return;
      }
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log(userCredential.user);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        if (docSnap.data().role === "user") {
          navigate("/");
        } else {
          navigate("/appointments");
        }
      } else {
        console.log("No such user found!");
      }
    } catch (error) {
      toast.error("" + error.message);

      console.log(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-items-center  bg-gray-100 dark:bg-gray-600  h-[90vh] md:h-[88vh]">
      <div className="max-w-sm m-auto w-5/6">
        <h3 className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
          Log in to your Account
        </h3>
        <form
          onSubmit={onSignIn}
          className="w-full m-auto p-4 bg-white dark:bg-gray-500 dark:text-gray-100 rounded-lg border-2"
        >
          <div className="mb-5">
            <label
              htmlFor="username-success"
              className="block mb-2 text-sm font-medium text-green-700 dark:text-white"
            >
              Email Id
            </label>
            <input
              type="text"
              id="username-success"
              required
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
              placeholder="8888888888"
            />
          </div>

          <button
            type="submit"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-400 text-sm font-light">
            <p className=" ">
              Dont have Account?
              <span
                onClick={() => navigate("/register")}
                className="text-red-600 hover:underline dark:hover:underline cursor-pointer dark:text-red-300"
              >
                Register
              </span>
            </p>
            <p className="text-blue-700 dark:text-blue-400 hover:underline dark:hover:underline cursor-pointer">
              forgot Password
            </p>
          </div>

          <div className="flex justify-center items-center my-4">
            <hr className="flex-grow bg-gray-300 dark:bg-gray-700 mx-2" />
            <p className="text-gray-500 dark:text-gray-300">OR</p>
            <hr className="flex-grow bg-gray-300 dark:bg-gray-700 mx-2" />
          </div>
          <OAuth />
        </form>
      </div>
    </main>
  );
};
