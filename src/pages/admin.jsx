import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import moment from "moment/moment";

export default function AdminPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const isLogin = useContext(AuthContext);
  const [title, setTitle] = useState("");

  const { user } = isLogin;
  const joinDate = moment(user?.metadata?.creationTime).fromNow();

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
      <div className="py-12">
        {user && (
          <>
            <div className="flex justify-center w-full">
              <img src={user?.photoURL} alt="" className="rounded-full" />
            </div>
            <div className="text-center py-2">
              <h1 className="text-lg">{user?.displayName}</h1>
              <p>Join {joinDate}</p>
              <button
                onClick={handleSignOut}
                className="text-md bg-blue-300 px-3 py-1 mt-3 rounded"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
