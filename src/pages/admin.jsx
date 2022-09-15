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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleTypeError = (error) => {
    if (error) {
      toast.error("Please insert only image file!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  };

  const deleteSelectedImage = () => {
    setImage(null);
    setFileUrl(null);
  };

  useEffect(() => {
    let mounted = false;
    if (user && !mounted) {
      toast.info(`Welcome back ${user.displayName}`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
    }
    return () => {
      mounted = true;
    };
  }, [user]);

  useEffect(() => {
    const checkAuth = () => {
      if (!isLogin.user) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [isLogin]);

  return (
    <Layout>
      {user && (
        <div>
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
            <div className="bg-white shadow-md rounded m-3 p-5">
              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col items-center space-y-2">
                  <h1 className="text-lg font-semibold text-blue-800">
                    Share your best image 🖼️
                  </h1>

                  <div className="w-[300px]">
                    <label
                      htmlFor="title"
                      className="block text-black text-sm font-bold mb-2"
                    >
                      Image name
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
                    />
                  </div>
                  <div>
                    {image && (
                      <div className="w-full relative">
                        <img
                          src={fileUrl}
                          alt="preview"
                          className="w-full max-w-full max-h-[320px] object-cover brightness-90"
                        />
                        <span
                          className="absolute top-3 right-3 cursor-pointer"
                          onClick={deleteSelectedImage}
                        >
                          <button
                            type="button"
                            className="text-white bg-red-500 px-4 py-1 rounded shadow"
                          >
                            Delete
                          </button>
                        </span>
                      </div>
                    )}
                    {image ? (
                      <p className="text-sm text-center font-semibold">
                        only one image can be uploaded
                      </p>
                    ) : (
                      <div className="w-[300px]">
                        <label
                          htmlFor="title"
                          className="block text-black text-sm font-bold mb-2"
                        >
                          Select your image
                        </label>
                        <FileUploader
                          handleChange={handleChange}
                          name="image"
                          types={fileTypes}
                          multiple={false}
                          children={dragDrop}
                          maxSize={2}
                          onSizeError={handleError}
                          onTypeError={handleTypeError}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
              <div className="m-3 py-12">
                <h3 className="text-md text-black">
                  Latest image by -{" "}
                  <span className="font-semibold text-blue-800">
                    {user?.displayName}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </Layout>
  );
}
