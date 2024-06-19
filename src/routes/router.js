import { createBrowserRouter } from "react-router-dom";
import { Allapointments, PageNotFound, ServiceList } from "../pages";
import { BookingForm } from "../components";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import PrivateRoute from "../components/PrivateRoute";
import App from "../App"; // Assuming App is your layout component
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import ContactUs from "../pages/ContactUs ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use your main App component as the layout
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        element: <PrivateRoute role="user" />,
        children: [
          {
            path: "/book",
            element: <BookingForm />,
          },
          {
            path: "/services",
            element: <ServiceList />,
          },
        ],
      },

      {
        element: <PrivateRoute role="admin" />,
        children: [
          {
            path: "/admin",
            element: <Admin />,
          },
          {
            path: "/appointments",
            element: <Allapointments />,
          },
        ],
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <SignUp />,
      },

      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export { router };
