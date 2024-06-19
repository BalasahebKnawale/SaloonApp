import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [docs, setDocs] = useState([]);

  const getData = useCallback(async (table) => {
    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(collection(db, table));

      const docList = [];
      querySnapshot.forEach((doc) => {
        docList.push(doc);
      });

      setDocs(docList);

      return docList;
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      setError(errorMessage);
      toast.error(errorMessage); // Show toast error message
    } finally {
      setLoading(false);
    }
  }, []);

  // const postData = useCallback(
  //   async (endpoint, postData) => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const response = await axios.post(`${baseUrl}${endpoint}`, postData, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       console.log("post api response is :", response.data);
  //       setData(response.data);
  //       return response; // Return the response for status checking
  //     } catch (error) {
  //       const errorMessage = error.response
  //         ? error.response.data
  //         : error.message;
  //       setError(errorMessage);
  //       console.log("error message is :", error);
  //       // toast.error(errorMessage); // Show toast error message
  //       return errorMessage; // Return the error response for status checking
  //     } finally {
  //       console.log("In final stage");
  //       setLoading(false);
  //     }
  //   },
  //   [baseUrl]
  // );

  return { loading, error, getData, docs };
};
