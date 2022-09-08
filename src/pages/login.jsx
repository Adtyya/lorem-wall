import { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Layout from "../components/Layout";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const isLogin = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = () => {
      if (isLogin.user) {
        navigate("/admin");
      }
    };
    checkAuth();
  }, [isLogin]);

  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        navigate("/admin");
      })
      .catch((err) => {
        Promise.reject(err);
      });
  };

  return (
    <Layout>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="text-center py-4">
          <h1 className="text-lg">
            Login to{" "}
            <span className="text-blue-800 font-semibold">Lorem Walp</span>
          </h1>
          <p className="text-lg">to share your best pictures</p>
        </div>
        <button
          className="bg-blue-400 text-lg px-3 py-1 rounded text-white"
          onClick={loginGoogle}
        >
          Login with google
        </button>
      </div>
    </Layout>
  );
}
