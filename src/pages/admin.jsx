import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import moment from "moment/moment";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "JPEG", "GIF"];

export default function AdminPage() {
  const dragDrop = (
    <div className="w-full border-2 border-gray-800 border-dashed rounded cursor-pointer">
      <div className="py-8 px-10">
        <p className="text-md text-black text-center  underline underline-offset-2">
          Drag or drop your image here
        </p>
        <p className="text-sm text-black text-center text-opacity-70">
          (Max size 2 MB)
        </p>
      </div>
    </div>
  );

  const navigate = useNavigate();
  const auth = getAuth();
  const isLogin = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const { user } = isLogin;
  const joinDate = moment(user?.metadata?.creationTime).fromNow();

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      navigate("/");
    });
  };

  console.log(fileUrl);

  const handleChange = (event) => {
    console.log(event);
    setImage(event);
    const preview = URL.createObjectURL(event);
    setFileUrl(preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "testing"), {
        title: title,
        created: Timestamp.now(),
      });
    } catch (error) {
      return Promise.reject("Invalid action");
    }
  };

  const handleError = (file) => {
    console.log(file);
  };

  return (
    <Layout>
      {user && (
        <>
          <div className="py-12">
            <div className="flex justify-center w-full">
              <img
                src={user?.photoURL}
                alt=""
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
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
            <div className="w-full flex flex-col items-center space-y-3">
              <h1 className="text-lg font-semibold">Share your best image</h1>
              {image && <img src={fileUrl} alt="preview" />}
              <div>
                <FileUploader
                  handleChange={handleChange}
                  name="image"
                  types={fileTypes}
                  multiple={false}
                  children={dragDrop}
                  maxSize={1}
                  onSizeError={handleError}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
