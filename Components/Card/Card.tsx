import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

const Card = ({ post, id }: any) => {
  const [since, setSince] = useState<any>(null)


  useEffect(() => {

    setSince(moment(post.post?.createdAt).fromNow())
  }, [since])

  return (
    <li className="h-96 border-1  w-card rounded overflow-hidden">
      <Link className="w-full" href={{ pathname: encodeURI(`/item/${id}`) }}  >
        <div className="bg-[#222222] h-1/2 w-full flex items-center justify-center overflow-hidden relative top-0">
          <img
            className="w-max h-48 object-scale-down"
            src={post.post.postimage[0]}
            alt=""
          />
          <p className="bg-[#FFCE32] absolute p-1 px-2 rounded-sm left-3 bottom-3 text-xs">
            FEATURED
          </p>
        </div>
        <div className="flex h-1/2 w-full ">
          <div className="w-2 bg-[#FFCE32] "></div>
          <div className="w-full mt-4 mx-3 ">
            <div className="h-36">
              <div className="flex items-start  justify-between gap-4 h-12 w-full ">
                <h1 className="w-10/12">{post.post.adTitle}</h1>
                <AiOutlineHeart className="text-3xl w-1/6" />
              </div>
              <p className="text-2xl font-bold mt-4">Rs {post.post.price}</p>
            </div>
            <div className="flex items-center ">
              <span>Pechs II, Karachi</span>
              <span>
                <BsDot />
              </span>
              <span>{since !== "Invalid date" || null ? since : ""}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Card;
