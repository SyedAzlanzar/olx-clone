
import React, { useEffect, useState } from 'react'
import PostTable from '../PostTable/PostTable'
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config/firebase';
import { Console } from 'console';

export const PostCategories = ({className}:any) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const colletionRef = collection(db, 'Categories');
  const [categoryShowStep1, setCategoryShowStep1]
    = useState("")
  const [categoryShowStep2, setCategoryShowStep2]
    = useState("")

  //REALTIME GET FUNCTION

  useEffect(() => {
    const q = query(
      colletionRef,
      //  where('owner', '==', currentUserId),
      where('title', '==', 'Categories') // does not need index
      //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      // limit(1)
    );
      

    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setCategories(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, []);

  const PostTableHandler = (item: any) => {
    setCategoryShowStep1(item.id)
    setCategoryShowStep2("")
  }

  const PostTableTwoHandler = (item: any) => {
    setCategoryShowStep2(item.id)
  }

  return (
    <div className='flex items-center justify-center'>
      <div className={`${className}`} >
        <div className='px-3 py-4 text-md font-semibold border-b-1 border-gray-400'>CHOOSE A CATEGORY
        </div>
        <div className='w-full flex'>
          <div className='w-1/3' >
            {categories.map((item: any, index) => {
              return item.parentId === null ? <PostTable item={item} key={index} categoryShowStep1={categoryShowStep1} PostTableHandler={PostTableHandler} /> : ""
            })}
          </div>
          <div className='w-1/3  border-r-1 border-gray-300'>
            {categories.map((item: any, index) => {
              return item.parentId === categoryShowStep1 ? (<PostTable item={item} key={index} PostTableTwoHandler={PostTableTwoHandler} />
              ) : null
            })}

          </div>
          <div className='w-1/3  border-r-1 border-gray-300'>
            {categories.map((item: any, index) => {
              return item.parentId === categoryShowStep2 ? <PostTable item={item} key={index} /> : null
            })}
          </div>

        </div>
      </div>
    </div>
  )
}