import React, { useState, useEffect } from "react";
import FeaturedCard from "./FeaturedCard";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Router, useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCart } from "../../Redux/reducers/userSlice";

const FeaturedAd = ({ packages }: any) => {
  const [checkedCount, setCheckedCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [card, setCard] = useState<any>([]);
  const [list, setList] = useState<any>(0);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.pathname.includes("/payments/viewcart/ALL")) setIsChecked(false);
  }, []);

  const handleCheckboxChange = (event: any, id: string) => {
    if (event.target.checked) {
      const newList = packages.filter((item: any) => {
        item.packageId === id ? setList(list + item.price) : null;
      });

      const item = packages.filter((item: any) => {
        return item.packageId === id;
      });

      setCard((prev: any) => [...prev, ...item]);
      console.log("========>", item);
      // setList()

      setCheckedCount(checkedCount + 1);
      setIsChecked(true);
    } else if (!event.target.checked) {
      if (checkedCount === 1) setIsChecked(false);
      // if(Router.push)
      setCheckedCount(checkedCount - 1);
      const newList = packages.filter((item: any) => {
        item.packageId === id ? setList(list - item.price) : null;
      });

      const item = packages.filter((item: any) => {
        return item.packageId !== id;
      });

      setCard((prev: any) => [...item]);
      console.log("========>", item);
      // setList()
    }
  };

  const cartHanlder = () => {
    dispatch(
      setCart({
        cart: card,
      })
    );
    router.push("/payments/viewcart/ALL");
  };

  return (
    <div>
      <div className="p-6 border-t-3 pr-0 border-1 border-gray-300 w-550 rounded">
        <div className="border-b-1 pb-3 border-gray-300">
          <h1 className="text-xl font-medium">FEATURED AD</h1>
          <div className="flex items-center gap-2 text-sm my-1 mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={16}
              viewBox="0 0 1024 1024"
              className="fill-[#ffce32] "
            >
              <path d="M878.34 192l-537 547.68L145.65 540.1H85.33v61.55L311.17 832h60.35l567.15-578.47V192z"></path>
            </svg>
            <p>Get noticed with 'FEATURED' tag in a top position</p>
          </div>

          <div className="flex items-center  gap-2 my-1 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={16}
              viewBox="0 0 1024 1024"
              className="fill-[#ffce32] "
            >
              <path d="M878.34 192l-537 547.68L145.65 540.1H85.33v61.55L311.17 832h60.35l567.15-578.47V192z"></path>
            </svg>
            <p>Package available for 90 days</p>
          </div>
        </div>
        <div>
          <h2 className="my-3 text-sm font-medium">Feature ads for 30 days</h2>
          <div className="flex items-center justify-evenly gap-4 pr-4 mt-6 ">
            {packages.map((pkg: any) => (
              <FeaturedCard
                handleCheckboxChange={handleCheckboxChange}
                pkg={pkg}
                key={pkg.packageId}
              />
            ))}
          </div>
        </div>
      </div>
      {isChecked ? (
        <div
          onClick={cartHanlder}
          className="bg-[#002F34] my-3 rounded flex justify-between items-center p-3 text-white cursor-pointer"
        >
          <span>
            <span className="border-r-1 px-3 ">{checkedCount} item </span>
            <span className="px-3">Total {list} </span>
          </span>
          <span className="flex items-center ">
            View Cart <MdOutlineArrowForwardIos className="ml-2 text-xl" />{" "}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default FeaturedAd;
