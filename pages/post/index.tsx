import React from "react";
import { PostCategories } from "../../Components/PostCategories/PostCategories";
import SellHeader from "../../Components/SellHeader/SellHeader";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter()
  return (
    <>
      <SellHeader />
      <h1 className="text-center font-semibold my-6 text-xl ">POST YOUR AD</h1>
      < PostCategories className="w-8/12 border-1 border-gray-400 rounded" />
    </>
  );
};

export default index;
