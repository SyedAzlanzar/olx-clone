import { collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { db } from '../../firebase/config/firebase';
import Button from '../Button/Button';
import ImageUploader from '../ImageUploader/ImageUploader';

const PostForm = () => {
    const userInfo = useSelector((state: any) => state.user.user.user)
    const [adTitle, setAdTitle] = useState("")
    const [description, setDescription] = useState("")
    const [condition, setCondition] = useState("")
    const [price, setPrice] = useState("")
    const [userName, setUserName] = useState(userInfo.userName)
    const [phoneNumber, setPhoneNumber] = useState('')
    const colletionRef = collection(db, 'SellPost');
    const router = useRouter()
    const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    const [imageUrls, setImageUrls] = useState<string[]>([]);
   
   


    const descriptionHandler = ((e: any) => {
        setDescription(e.target.value)
    })

    const adTitleHandler = ((e: any) => {
        setAdTitle(e.target.value)
    })

    const conditionHandler = ((e: any) => {

        setCondition(e.target.value)
    })


    const priceHandler = ((e: any) => {

        setPrice(e.target.value)
    })

    async function userStoreInFirestore() {
        const newPost = {
            adTitle: adTitle,
            description: description,
            condition: condition,
            price: price,
            userId: userInfo.userId,
            postimage: imageUrls,
            userName: userName,
            phoneNumber: phoneNumber,
            createdAt: new Date().getTime(),
            location: "Gulistan-e-Johar"

        };
        try {
            const userRef = doc(colletionRef, v4());
            await setDoc(userRef, newPost);
        } catch (error) {
            console.error(error);
        }
    }


    const postHandler = async () => {
        await userStoreInFirestore()
        toast("Ad Created Successfully", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
            position: "bottom-right",
        });
        setImageUrls([])
        router.push("/")
    }

    return (
        <>
            <form action="" className='bg-ornge-100 mx-4' onClick={(e) => { e.stopPropagation() }}>
                <div><h1 className='text-xl font-semibold  my-6'>INCLUDE SOME DETAILS</h1></div>

                <fieldset>
                    <label htmlFor="">Ad Title</label>
                    <br />
                    <input type="text" className='w-full  py-2 px-3 rounded-md border-1 outline-none' value={adTitle} onChange={adTitleHandler} />
                    <p className='text-xsm'>Mention the key features of your item (e.g. brand, model, age, type)</p>
                </fieldset>

                <fieldset>
                    <label htmlFor="">Description</label><br />
                    {/* <input type="text" className='w-full  py-2 px-3 rounded-md border-1 outline-none' /> */}
                    <textarea name="" id="" className='w-full resize-none outline-none py-2 px-3 border-1 rounded-md' cols={20} rows={7} value={description} onChange={descriptionHandler}  ></textarea>
                    <p className='text-xsm'>Include condition, features and reason for selling</p>
                </fieldset>

                <fieldset>
                    <label htmlFor="">Brand</label>
                    <div className='flex items-center justify-between py-2 px-3 border-1 rounded-md bg-white cursor-pointer'>
                        <div></div>
                        <MdOutlineKeyboardArrowDown className='text-3xl' />
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="">Condition</label>
                    <div className="flex items-center">

                        <input type="radio" id='New' name='tab' className='hidden' onChange={conditionHandler} value="New" />
                        <label htmlFor="New" className='inline-block border-1 cursor-pointer mx-2 p-2'>New</label>

                        <input type="radio" id='Used' name='tab' className='hidden' value="Used" onChange={conditionHandler} />
                        <label htmlFor="Used" className='inline-block border-1 cursor-pointer mx-2 p-2' >Used</label>

                        <input type="radio" id='Open Box' name='tab' className='hidden' value={"Open Box"} onChange={conditionHandler} />
                        <label htmlFor="Open Box" className='inline-block border-1 cursor-pointer p-2'>Open Box</label>

                        <input type="radio" id='Refurbished' name='tab' className='hidden' value="Refurbished" onChange={conditionHandler} />
                        <label htmlFor="Refurbished" className='inline-block border-1 cursor-pointer p-2 mx-2'>Refurbished</label>
                    </div>
                </fieldset>

                <div className='py-5 border-1 rounded-md my-2'>
                    <h1 className='text-lg font-semibold'>SET PRICE</h1>
                    <label htmlFor="">Price</label>
                    <div className='flex items-center bg-white border-1 rounded-t-md' ><span className='w-8 ml-4'>Rs |</span><input onChange={priceHandler} value={price} type="text" className='w-full outline-none  py-2 px-3' /></div>
                </div>

                <div><h1 className='text-xl font-semibold  my-6'>UPLOAD UP TO 20 PHOTOS</h1></div>
                <div className='flex items-center justify-start gap-6 flex-wrap'>
                    {
                        images.map((item, index) => {
                            return <ImageUploader setImageUrls={setImageUrls} key={index} />
                        })
                    }
                </div>

                <div>
                    <h1 className='text-xl font-semibold  my-6'>REVIEW YOUR DETAILS</h1>
                    <div className='flex items-start gap-4 '>
                        <div className='w-1/12 h-1/12 bg-slate-400 rounded-full overflow-hidden'><img className='object-cover w-full' src={userInfo.profileImage ? userInfo.profileImage : "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"} alt="" /></div>
                        <div className='w-full'>
                            <label htmlFor="">Name</label>
                            <input type="text" value={userName} onChange={(e: any) => { setUserName(e.target.value) }} className='p-2 outline-none focus:border-slate-700 focus:border-3 font-medium text-lg rounded w-full border-1 border-gray-400 my-2' /></div>

                    </div>

                    <h1 className='text-xl font-semibold text-[#002F34] my-6'>Let's verify your account </h1>
                    <div className='w-full'>
                        <label htmlFor="">Phone Number</label>
                        <input placeholder='Phone Number' type="text" value={phoneNumber} onChange={(e: any) => { setPhoneNumber(e.target.value) }} className='p-2 font-medium text-lg rounded w-full border-1 border-gray-400 my-2 outline-none focus:border-slate-700 focus:border-3' /></div>
                </div>

                <Button type='button' text={"Post Ad"} onClick={postHandler} className="py-3 px-5 bg-[#002F34] text-white m-5 mx-0 font-medium rounded hover:bg-[#003e50]" />
            </form></>
    )
}

export default PostForm