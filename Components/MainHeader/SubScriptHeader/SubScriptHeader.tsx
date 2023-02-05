import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import cookie from "react-cookies";
import { IoMdNotificationsOutline } from "react-icons/io";
import { auth, db, googleAuthProvider } from "../../../firebase/config/firebase";
import Button from "../../Button/Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import LogoutTable from "../../LogoutTable/LogoutTable";
import Location from "../../Locations/Location";
import { removeUser, setUser } from "../../../Redux/reducers/userSlice";
import PopUpContainer from "../../PopUpContainer/PopUpContainer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { collection, doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";

export interface userProfileDetails {
  userName?: string;
  userId?: string;
  userEmail?: string;
  profileImage?: string;
}


export default function SubScriptHeader() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const canclePopupHandler = () => {
    setIsPopupOpen(false);
  };
  const router = useRouter()
  // const [token, setToken] = useState<null | string>(null)
  // const [userProfileImage, setUserProfileImage] = useState<null | string>(null)
  const token = useSelector((state: any) => state.user.user.accessToken);
  const userProfileImage = useSelector(
    (state: any) => state.user.user.user.profileImage
  );

  const colletionRef = collection(db, 'Users');
  const [isOpen, setIsOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = () => {
    setIsPopupOpen(true)
  };


  async function userStoreInFirestore(user: any, token: string) {
    const newUser = {
      accessToken: token,
      user: {
        userName: user.displayName,
        userId: user.uid,
        userEmail: user.email,
        profileImage: user.photoURL,
      },
    };

    try {
      const userRef = doc(colletionRef, user.uid);
      await setDoc(userRef, newUser);
    } catch (error) {
      console.error(error);
    }
  }


  const loginWithGoogleHandler = async () => {
    // const user: any = await signInWithGoogle(dispatch);
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const token = await user.getIdToken(true).then((idToken) => idToken);
        dispatch(removeUser({}));
        dispatch(
          setUser({
            accessToken: token,
            user: {
              userName: user.displayName,
              userId: user.uid,
              userEmail: user.email,
              profileImage: user.photoURL,
            },
          })
        );
        if (token !== null) {
          cookie.save("token", JSON.stringify(token), {
            path: "/",
          });
          userStoreInFirestore(user, token)
          setIsPopupOpen(false);
          toast("Login Successful", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
            position: "bottom-right",
          });
        } else console.log("first token emptied");

        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    // if (user.accessToken !== null) {
    //   cookie.save("token", JSON.stringify(user.accessToken), {
    //     path: "/",
    //   });
    //   await userStoreInFirestore(user.user, user.accessToken)
    //   setIsPopupOpen(false);
    //   toast("Login Successful", {
    //     hideProgressBar: true,
    //     autoClose: 2000,
    //     type: "success",
    //     position: "bottom-right",
    //   });
    // } else console.log("first token emptied");
  };

  const toggleHandler = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleLocationHandler = () => {
    setIsLocationOpen((prevIsLocationOpen) => !prevIsLocationOpen);
  };

  const logoutHandler = () => {
    dispatch(removeUser({}));
    cookie.remove("token");
    toast("Logout Successful", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "info",
      position: "bottom-right",
    });
    router.push('/')
  };


  const sellHandler = () => {
    token ? router.push("/post") : toast("Please Login or Create an Account", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "info",
      position: "top-right",
    });
  }

  return (
    <div className="py-3 flex items-center gap-4 ">
      <PopUpContainer
        setIsPopupOpen={setIsPopupOpen}
        isPopupOpen={isPopupOpen}
        canclePopupHandler={canclePopupHandler}
        loginWithGoogleHandler={loginWithGoogleHandler}
      />
      <span className="mr-4 cursor-pointer" onClick={() => router.push("/")}>
        <svg height="34" viewBox="0 0 36.289 20.768" className="">
          <path d="M18.9 20.77V0h4.93v20.77zM0 10.39a8.56 8.56 0 1 1 8.56 8.56A8.56 8.56 0 0 1 0 10.4zm5.97-.01a2.6 2.6 0 1 0 2.6-2.6 2.6 2.6 0 0 0-2.6 2.6zm27 5.2l-1.88-1.87-1.87 1.88H25.9V12.3l1.9-1.9-1.9-1.89V5.18h3.27l1.92 1.92 1.93-1.92h3.27v3.33l-1.9 1.9 1.9 1.9v3.27z"></path>
        </svg>
      </span>

      <div className="px-2 flex items-center text-lg  border-2 border-black rounded h-12 relative bg-white">
        <div className="flex items-center gap-3 ">
          <div>
            <AiOutlineSearch />
          </div>
          <div
            className="flex items-center gap-3"
            onClick={toggleLocationHandler}
          >
            <div>
              <input
                className="outline-0 "
                value="Pakistan"
                placeholder="Pakistan"
                autoComplete="location-search"
                onChange={() => { }}
              />
            </div>
            <div className="text-2xl cursor-pointer">
              {isLocationOpen ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
            </div>
          </div>
        </div>
        {isLocationOpen ? <Location /> : ""}
      </div>

      <div className="flex items-center bg-white border-2 justify-between border-black rounded w-1/2 h-12  ">
        <input
          type="search"
          className="outline-none text-xl  m-2 w-full"
          placeholder="Find Cars,Mobile Phones and more..."
        />
        <div className="text-white bg-black text-2xl px-3 h-12 flex items-center">
          <AiOutlineSearch />
        </div>
      </div>

      {/* will render if and only if user is logged in */}
      {token && token !== null ? (
        <div className="flex items-center gap-3 text-2xl ml-5">
          <span className="hover:bg-[#C8F8F6] p-2 rounded-full cursor-pointer">
            <BsChatDots />
          </span>
          <span className="hover:bg-[#C8F8F6] p-2 rounded-full cursor-pointer">
            <IoMdNotificationsOutline />
          </span>
          <span>
            <span
              onClick={toggleHandler}
              className="flex items-center cursor-pointer relative"
            >
              <span className="w-8 h-8 overflow-hidden rounded-full">
                <img
                  src={
                    userProfileImage
                      ? userProfileImage
                      : "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
                  }
                  alt=""
                />
              </span>
              {isOpen ? (
                <MdOutlineKeyboardArrowUp className="text-2xl" />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-2xl" />
              )}
              <div className="absolute top-10 right-0 z-10 transition-all">
                {isOpen ? <LogoutTable logoutHandler={logoutHandler} /> : null}
              </div>
            </span>
          </span>
        </div>
      ) : (
        <div className="border-b-2 border-black text-center font-medium h-6  hover:border-0 ml-4 mr-2 text-md cursor-pointer">
          <Button type="button" text={"Login"} onClick={loginHandler} />
        </div>
      )}

      <div onClick={sellHandler} className="h-12 relative top-0 cursor-pointer flex items-center justify-center">
        <img
          src="https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg"
          alt="Icon-border not found"
        />
        <div className="flex items-center justify-center gap-2 font-medium absolute ">
          <img
            src="https://www.olx.com.pk/assets/iconPlusSell_noinline.75fc7ea23e80b50447cf5757d8ef083a.svg"
            alt=""
          />
          <h1>SELL</h1>
        </div>
      </div>
    </div>
  );
}
