import { useEffect, useState } from "react";
import { createContext } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

// Create Authentication Context
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to create a new user (Register)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to update user profile (Name & Photo)
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Function to sign in with email & password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log out
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("authToken");
    return signOut(auth);
  };

  // onAuthStateChanged and JWT token handling
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser?.email) {
        setUser(currentUser);

        // Get JWT token and store it in localStorage
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: currentUser.email }
        );

        // Save the token in localStorage
        localStorage.setItem("authToken", response.data.token);
      } else {
        setUser(currentUser);
        localStorage.removeItem("authToken"); // Remove token on logout
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Authentication info to be shared
  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
