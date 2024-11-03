import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../scripts/Firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAiContext } from "./AiContext";

const provider = new GoogleAuthProvider();

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { chats } = useAiContext();

  const navigate = useNavigate();

  console.log("current user: ", currentUser);

  const loginWithGoogle = async () => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        navigate(`/chats/${chats[chats.length - 1].id}`);
      } else {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        navigate(`/chats/${chats[chats.length - 1].id}`);
        localStorage.setItem("user", user);
        return user;
      }
    } catch (error) {
      navigate("/");
      console.error("Error during Google login process:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
