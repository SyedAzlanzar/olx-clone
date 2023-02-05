

import React, { useState } from "react";

const Location = () => {

  const [location, setLocation] = useState<any>(null)
  console.log(location)

  const findMyCoordinates = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const bdcApi =  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
        getApi(bdcApi)
      },
        (err) => {
          alert(err.message)
        })
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }
  const getApi = async (bdcApi: any) => {
    try {
      fetch(bdcApi)
        .then(response => response.json())
        .then(result => setLocation(result))
        .catch(error => console.log('error', error));
    }
    catch (err) { err ? console.log(err) : "" }
  }
  return (
    <div className=" bg-white shadow-top absolute top-12 w-full left-0 right-0 h-320 rounded-md  overflow-y-scroll transition-all ">
      <div className="hover:bg-[#C8F8F6] cursor-pointer" onClick={() => findMyCoordinates()}>
        <div className="flex items-center gap-4 py-4 mx-4 ">
          <img
            src="https://www.olx.com.pk/assets/iconCurrentLocation_noinline.6acc646ec0e4ecdee696b5588b92c859.svg"
            alt=""
          />{location === null || undefined ?
            <span>
              <p>Use Current Location</p>
              <p className="text-sm">PECHS</p>
            </span> :
            <span>
              <p>{location.locality}</p>
            </span>}
        </div>
      </div>
      <div className="border-y-1 hover:bg-[#C8F8F6]">
        <div className="py-4 mx-4 flex items-center gap-4 ">
          <span>
            <img
              src="https://www.olx.com.pk/assets/iconLocation_noinline.dd275c9d8c1ed5d1f8c45bd6859ca4df.svg"
              alt=""
            />
          </span>
          <span>See ads in all Pakistan</span>
        </div>
      </div>
      <div>
        <h4 className="text-xs text-gray-400 m-4">ALL LOCATIONS</h4>
        <ul className="">

          <li className="hover:bg-[#C8F8F6]">
            <div className="flex items-center gap-4 py-4 mx-4">
              <span>
                <img
                  src="https://www.olx.com.pk/assets/iconLocation_noinline.dd275c9d8c1ed5d1f8c45bd6859ca4df.svg"
                  alt=""
                />
              </span>
              <span>aaa</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Location;
