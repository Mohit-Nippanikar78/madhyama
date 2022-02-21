import React from "react";
// import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Video from "../assets/share.mp4";
import Logo from "../assets/logowhite.png";
import socialMediaAuth from "../config/auth";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
const Login = () => {
  let navigate = useNavigate();
  const socialMediaAuthParent = async (params) => {
    let data = await socialMediaAuth(params);
    console.log(data);
    let { localId, fullName, photoUrl } = data;
    const doc = {
      _id: localId,
      _type: "user",
      userName: fullName,
      image: photoUrl,
    };
    client.createIfNotExists(doc).then(async () => {
      await navigate("/", { replace: true });
    });

    localStorage.setItem("user", JSON.stringify(doc));
  };
  return (
    <div className="flex items-center  justify-start h-screen ">
      <div className="w-full h-full relative  ">
        <video
          src={Video}
          loop
          controls={false}
          className="object-cover w-full h-full"
        ></video>
        <div className="absolute flex flex-col items-center justify-center top-0 left-0 bottom-0 right-0 bg-blackOverlay text-white">
          <div className="p-5">
            <img src={Logo} width="130px" />
          </div>
          <div className="shadow-2xl flex flex-col ">
            <button
              type="button"
              className="bg-mainColor text-black p-3 cursor-pointer rounded-lg flex items-center"
              onClick={() => {
                socialMediaAuthParent("Google");
              }}
            >
              <FcGoogle className="mr-3 " />
              Sign in with Google
            </button>
            <button
              type="button"
              className=" mt-3 bg-mainColor text-black p-3 cursor-pointer rounded-lg flex items-center"
              onClick={() => {
                socialMediaAuthParent("Facebook");
              }}
            >
              <FaFacebook className="mr-3 " />
              Sign in with Facebook
            </button>
            {/* <GoogleLogin
              clientId=""
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor text-black p-3 cursor-pointer rounded-lg flex items-center"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-3 " />
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
