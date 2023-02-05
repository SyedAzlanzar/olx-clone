import SuperScriptHeader from "./SuperScriptHeader/SuperScriptHeader";
import SubScriptHeader from "./SubScriptHeader/SubScriptHeader";

const MainHeader = () => {
  
  return (
    <div className="bg-[#F7F8F8]  py-1 sticky top-0 z-50 ">
      <div className=" w-3/4 mx-auto">
        <SuperScriptHeader />
        <SubScriptHeader />
      </div>
    </div>
  );
};

export default MainHeader;
