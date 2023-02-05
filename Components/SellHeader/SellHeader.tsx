import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const SellHeader = ({ className }: any) => {
  const router = useRouter()
  const onClickHandler = () => {
    router.push("/")
  }

  return (
    <>
      <div className={`bg-[#F7F8F8] shadow-sm px-4 py-2 ${className ? className : null}`}>
        <span onClick={onClickHandler} className="cursor-pointer flex items-center gap-6" >
          <span>
            <AiOutlineArrowLeft className="text-2xl" />
          </span>
          <span>
            <img
              src="https://www.olx.com.pk/assets/logo_noinline.1cdf230e49c0530ad4b8d43e37ecc4a4.svg"
              alt=""
            />
          </span>
        </span>
      </div>
    </>
  );
};

export default SellHeader;
