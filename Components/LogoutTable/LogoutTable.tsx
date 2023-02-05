import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const LogoutTable = ({ logoutHandler }: any) => {
  const userData = useSelector((state: any) => state.user.user.user);
  const router = useRouter()

  const items = [
    {
      title: "My ads",
      icon: "https://www.olx.com.pk/assets/iconMyAds_noinline.81f6b0cc8a3d16d363fb142e1489d035.svg",
      border: "border-t-1 border-gray",
    },
    {
      title: "Buy business packages",
      icon: "https://www.olx.com.pk/assets/iconBusinessPackages_noinline.64a7db94ef2eb1776d43916ce82b1a40.svg",
    },
    {
      title: "Bought Packages & Billing",
      icon: "https://www.olx.com.pk/assets/iconBoughtPackages_noinline.b29b2b61c39def95f4bf58ac5b6dbb59.svg",
    },
    {
      title: "Help",
      icon: "https://www.olx.com.pk/assets/iconHelp_noinline.f07d255148323e318808a50c52097d0c.svg",
      border: "border-t-1 border-gray",
    },
    {
      title: "Settings",
      icon: "https://www.olx.com.pk/assets/iconFilters_noinline.0aa1e7bd623dcbcc065196fa3ccba789.svg",
    },
    {
      title: "Logout",
      icon: "https://www.olx.com.pk/assets/iconLogout_noinline.9da9ed94dfe84e900cc1ae3198b0375b.svg",
      border: "border-t-1 border-gray ",
    },
  ];

  const functionHandler = (title: string) => {
    if (title === "Logout") logoutHandler()
    else if (title === "Buy business packages") router.push("/payments/businesspackages/my-account")
  }

  return (
    <div className="w-logout  bg-white border shadow-top">
      <div className="flex items-start gap-4 mx-4 mt-4">
        <span className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src={
              userData.profileImage
                ? userData.profileImage
                : "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
            }
            alt=""
          />
        </span>
        <span>
          <p className="text-lg">Hello,</p>
          <p className="text-xl font-bold">{userData.userName ? userData.userName : userData.userEmail}</p>
          <Link href={"/"}>
            <div className="text-sm underline mb-3">
              View and edit your Profile
            </div>
          </Link>
        </span>
      </div>

      <ul>
        {items.map((item, index) => {
          return (
            <li
              // onClick={item.title === "Logout" ? logoutHandler : null}
              onClick={() => functionHandler(item.title)}
              key={index}
              className={` gap-5 text-lg ${item.border ? item.border : null
                } hover:bg-[#C8F8F6]`}
            >
              <div className="flex items-center gap-5 h-11 text-base mx-4 cursor-pointer ">
                <span>
                  <img src={item.icon} alt="" />
                </span>
                <span>{item.title}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LogoutTable;
