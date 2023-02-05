import { IoIosArrowDown } from "react-icons/io";

const CategoryHeader = () => {
  const categories = [
    "Mobile Phones ",
    "Cars",
    "Motorcycles",
    "House",
    "TV-Video-Audio",
    "Tablets",
    "Land & PLots",
  ];

  return (
    <div className=" bg-white shadow ">
      <div className=" flex gap-5 items-center py-3 w-3/4 mx-auto">
        <div className="font-medium flex items-center gap-1 text-sm cursor-pointer">
          ALL CATEGORIES
          <span className="text-2xl">
            <IoIosArrowDown />
          </span>
        </div>

        {categories.map((category, index) => {
          return (
            <div
              className="text-sm hover:text-[#23E5DB] cursor-pointer"
              key={index}
            >
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryHeader;
