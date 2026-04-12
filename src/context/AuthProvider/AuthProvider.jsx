import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerWithEmail = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (profile) => {
    if (auth.currentUser) return;
    return updateProfile(profile);
  };

  const userSignOut = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = useMemo(() => {
    (registerWithEmail,
      signInWithEmail,
      signInWithGoogle,
      updateUser,
      userSignOut,
      loading,
      user);
  }, [user, loading]);

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
