import React from "react";
import Button from "../Button/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiPhone } from "react-icons/hi";

const LoginPopup = ({
  loginWithGoogleHandler,
  setSignInWithEmailAndPassword,
  setIsback,
}: any) => {
  return (
    <div className="">
      <div className="flex justify-center mt-2 py-3">
        <img
          src="https://www.olx.com.pk/assets/iconOLXLogin_noinline.93e8a1a9cf50902ba5250814f57810ff.svg"
          alt=""
        />
      </div>
      <div className="text-center w-80 mx-auto py-2">
        <p>WELCOME TO OLX</p>
        <p>The trusted community of buyers and sellers.</p>
      </div>
      <div className="w-64 mx-auto py-4">
        <div className="flex justify-center py-3 border-2 my-3 border-black rounded hover:border-[#3a77ff]">
          <Button
            onClick={loginWithGoogleHandler}
            text={
              <div className="flex items-center justify-left gap-5">
                <FcGoogle />
                {"Continue with Google"}
              </div>
            }
          />
        </div>
        <div className="flex justify-center py-3 border-2 my-3 border-black rounded hover:border-[#3a77ff] ">
          <Button
            text={
              <div className="flex items-center  justify-center gap-5">
                <FaFacebook className="w-4  text-[#247EF2]" />
                {"Continue with Facebook"}
              </div>
            }
          />
        </div>
        <div
          className="flex  justify-center py-3 border-2 my-3 border-black rounded hover:border-[#3a77ff]"
          onClick={() => {
            setIsback(true);
            setSignInWithEmailAndPassword(true);
          }}
        >
          <Button
            text={
              <div className="flex items-center justify-center  gap-5">
                <MdEmail className="text-2l" />
                {"Continue with Email"}
              </div>
            }
          />
        </div>
        <div className="flex  justify-center py-3 border-2 my-3 border-black rounded hover:border-[#3a77ff]">
          <Button
            text={
              <div className="flex items-center justify-center gap-5">
                <HiPhone />
                {"Continue with Phone"}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
