import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config/firebase";
import { useSelector } from "react-redux";


const Cards = () => {
  const [postData, setpostData] = useState<any[]>([])
  const [visible, setVisible] = useState(11);
  const [loading, setLoading] = useState(false);
  const uid = useSelector((state: any) => state.user.user.user.userId)



  useEffect(() => {
    const getAds = async () => {
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, "SellPost"));
      const items: any = [];

      querySnapshot.forEach((doc) => {
        // uid === doc.data().userId ?
        items.push({ post: doc.data(), postId: doc.id })
        // :null
      });
      setpostData(items);
      setLoading(false);
    };

    try {
      getAds();
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line
  }, [uid]);

  return (
    <div className="z-0">
      <h1 className="text-3xl">Fresh recommendations</h1>
      <ul className="flex gap-5 lg:gap-4 md:gap-0 px-1 py-5 flex-wrap items-center justify-start ">
        {postData.map((post, index) => {
          return <Card post={post} id={postData[index].postId} key={index} />;
        })}

        {postData.length >= 20 ?
          <div className="justify-center flex w-full">
            <Button
              text={"Load more"}
              className=" px-2 bg-white rounded border-2 border-black h-11 hover:border-3 hover: font-semibold "
            />
          </div> : null}
      </ul>
    </div>
  );
};

export default Cards;


