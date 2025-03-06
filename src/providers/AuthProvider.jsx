/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

// Create Authentication Context
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to create a new user (Register)
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Update user profile (name & photo)
      await updateProfile(newUser, {
        displayName: name,
        photoURL: photoURL,
      });

      // Manually update state to reflect changes instantly
      setUser({ ...newUser, displayName: name, photoURL: photoURL });

      // Get JWT token after registration
      const token = await getJWTToken(newUser.email);
      localStorage.setItem("authToken", token);

      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to update user profile (Name & Photo)
  const updateUserProfile = async (name, photoURL) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      // Manually update state to reflect changes instantly
      setUser({ ...auth.currentUser, displayName: name, photoURL: photoURL });
    }
  };

  // Function to sign in with email & password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      // Get JWT token after login
      const token = await getJWTToken(loggedInUser.email);
      localStorage.setItem("authToken", token);

      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to log out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      setUser(null); // Clear user state on logout
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch JWT token
  const getJWTToken = async (email) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email });
      return response.data.token;
    } catch (error) {
      console.error("Error fetching JWT token:", error);
      return null;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setLoading(true);
      if (currentUser?.email) {
        setUser(currentUser);

        const token = await getJWTToken(currentUser.email);
        localStorage.setItem("authToken", token);
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
