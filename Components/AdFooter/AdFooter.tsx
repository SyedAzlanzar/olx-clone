import { AiFillApple } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";

const AdFooter = () => {
  return (
    <div className="bg-[#F7F8F9] flex items-center justify-center mt-8 gap-8 ">
      <div className="w-1/5">
        <img
          src="https://www.olx.com.pk/assets/olxMobileApp.f5579f77e849b600ad60857e46165516.webp"
          alt=""
        />
      </div>
      <div className="w-1/5">
        <h1 className="font-semibold text-4xl mb-5">TRY THE OLX APP</h1>
        <p className="text-lg">
          Buy, sell and find just about anything using the app on your mobile.
        </p>
      </div>
      <div className="w-0 h-28 bg-gray-300"></div>

      <div className="w-1/5">
        <h3 className="font-medium tracking-widest text-sm my-5	">
          GET YOUR APP TODAY
        </h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <div className="flex items-start justify-center bg-black rounded text-white p-1 gap-1">
              <AiFillApple className="text-4xl text-white" />
              <div className="text-xs font-light leading-4 ">
                Download on the
                <div className="text-lg leading-4 ">App Store</div>
              </div>
            </div>
            <div></div>
          </div>

          <div className="flex items-center">
            <div className="flex items-start justify-center bg-black rounded text-white p-1 gap-1">
              <IoLogoGooglePlaystore className="text-4xl text-white" />
              <div className="text-xs font-light leading-4 ">
                Get in on
                <div className="text-lg leading-4 ">Google Play</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdFooter;
