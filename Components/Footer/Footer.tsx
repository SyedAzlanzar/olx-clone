import { CiFacebook } from "react-icons/Ci";
import { TiSocialTwitterCircular } from "react-icons/Ti";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#EBEEEF] pt-2 pb-12 border-t-1 border-zinc-200">
        <div className="w-3/4 mx-auto flex gap-14 items-start justify-between text-xs leading-5 ">
          <div className="text-slate-400 font-light">
            <h1 className="text-sm my-2 text-black font-semibold">
              POPULAR CATEGORIES
            </h1>
            <p>Cars</p>
            <p>Flats for rent</p>
            <p>Mobile Phones</p>
            <p>Jobs</p>
          </div>

          <div className="text-slate-400 font-light">
            <h1 className="text-sm my-2 text-black font-semibold">
              TRENDING SEARCHES
            </h1>
            <p>Bikes</p>
            <p>Watches</p>
            <p>Books</p>
            <p>Dogs</p>
          </div>

          <div className="text-slate-400 font-light">
            <h1 className="text-sm my-2 text-black font-semibold">ABOUT US</h1>
            <p>About EMPG</p>
            <p>OLX Blog</p>
            <p>Contact Us</p>
            <p>OLX for Business</p>
          </div>

          <div className="text-slate-400 font-light">
            <h1 className="text-sm my-2 text-black font-semibold">OLX</h1>
            <p>Help</p>
            <p>Sitemap</p>
            <p>Terms of use</p>
            <p>Privacy Policy</p>
          </div>

          <div className="text-slate-400  font-light">
            <h1 className="text-sm my-2 text-black font-semibold">FOLLOW US</h1>
            <span className="flex items-center text-2xl gap-4">
              <CiFacebook /> <TiSocialTwitterCircular /> <AiOutlineYoutube />
              <AiOutlineInstagram />
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#002F34] py-3">
        <p className="text-xs mx-auto w-3/4 text-white text-right">
          Free Classifieds in Pakistan &nbsp; .&#169; 2006-2023 OLX
        </p>
      </div>
    </div>
  );
};

export default Footer;
