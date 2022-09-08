import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function AdminPage() {
  const navigate = useNavigate();
  const isLogin = useContext(AuthContext);
  const [title, setTitle] = useState("");

  const { user } = isLogin;
  console.log(user);

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      navigate("/");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "testing"), {
        title: title,
        created: Timestamp.now(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex justify-center py-12">
        <div className="text-center">
          <img src={user?.photoURL} alt="" className="rounded-full" />
          <h1 className="text-lg">{user?.displayName}</h1>
        </div>
      </div>
    </Layout>
  );
}
