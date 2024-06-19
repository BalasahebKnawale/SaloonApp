import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInrole, setloggedInrole] = useState("user");
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setloggedInrole(docSnap.data().role);
        } else {
          console.log("No such user found!");
        }

        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { loggedIn, checkingStatus, loggedInrole };
}
