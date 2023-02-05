import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import moment from 'moment';
import { GetServerSidePropsContext } from 'next';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { AiOutlineHeart } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import { IoIosArrowBack } from "react-icons/io"
import Button from '../../Components/Button/Button';
import { db } from '../../firebase/config/firebase';
import ImageSlider from '../../Components/ImageSlider/ImageSlider';
import { FiPhone } from "react-icons/fi"
import { toast } from 'react-toastify';

const ItemDetails = ({ item }: any) => {
    const userprofile = useSelector((state: any) => state.user.user.user.profileImage)
    const accessToken = useSelector((state: any) => state.user.user.accessToken)
    const [counter, setCounter] = useState(0)
    const [phoneNumberVisible, setPhoneNumberVisible] = useState(false)

    const forwardHandler = () => {
        counter < (item.postimage).length - 1 ? setCounter(() => counter + 1) : setCounter(0)
    }

    const backwardHandler = () => {
        counter <= (item.postimage).length - 1 ? setCounter(() => counter - 1) : setCounter(0)
    }

    const phoneNumberHandler = () => {
        accessToken ? setPhoneNumberVisible(true) : toast("Please Login", {
            hideProgressBar: true,
            autoClose: 600,
            type: "warning",
            position: "bottom-right",
        });
    }


    return (
        <>
            <div className=''>
                <div className='w-8/12 bg-white h-[100vh] mx-auto p-4'>
                    <div className=' flex gap-4'>
                        <div className='w-3/4'>
                            <div className=' rounded border-1  border-gray-300'>
                                <div className='relative flex justify-between bg-black h-500 p-4 items-center'>
                                    {counter !== 0 ? <IoIosArrowBack className='w-20 h-12 hover:bg-[#f5f5f51a] text-white cursor-pointer' onClick={backwardHandler} /> : <div className='w-16'></div>}
                                    <img src={item.postimage[counter]} className="object-contain h-full w-full" alt="" />
                                    <IoIosArrowForward className='w-20 h-12  text-white cursor-pointer hover:bg-[#f5f5f51a]' onClick={forwardHandler} />
                                </div>
                                <div className='flex'>
                                    {item.postimage.map((postImage: any, index: number) => <ImageSlider key={index} id={index} postImage={postImage} setCounter={setCounter} counter={counter} className={"p-4"} />)}
                                </div>
                            </div>

                            <div className='border-1 rounded border-gray-300 mt-5 p-4'>
                                <h1 className='text-xl mb-4'>Details</h1>
                                <div className=''>
                                    <div className='flex gap-20 my-1' >
                                        <span className='w-20'>Brand</span>
                                        <span>{item.adTitle}</span>
                                    </div>

                                    <div className='flex gap-20 my-1'>
                                        <span className='w-20'>Price</span>
                                        <span>{item.price}</span>
                                    </div>
                                    <div className='flex gap-20 my-1'>
                                        <span className='w-20'>Condition</span>
                                        <span>{item.condition}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <div className='m-3 h-34 overflow-hidden bg-white p-3 border-1 rounded border-gray-300'>
                                <div className='flex justify-between items-center '>
                                    <h1 className='text-4xl font-semibold'>Rs {item.price}</h1>
                                    <AiOutlineHeart className='text-3xl' />
                                </div>
                                <p className='text-lg font-light leading-5 tracking-widest text-gray-400'>{item.adTitle}</p>
                                <div className='flex items-center justify-between text-sm text-gray-400 font-extralight pt-4'>
                                    <p>Location</p>
                                    <p>{item.createdAt}</p>
                                </div>
                            </div>

                            <div className='border-1 m-3 rounded border-gray-300'>
                                <div className='m-3 p-3'><h1 className='text-2xl font-semibold'>Seller Description</h1>
                                    <div className='flex items-center gap-3 my-3'>
                                        <div className='w-[70px] bg-white h-[70px] rounded-full overflow-hidden'>
                                            <img src={userprofile ? userprofile : "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"} alt="" />
                                        </div>
                                        <h3 className='text-lg font-medium'>{item.userName}</h3>

                                    </div>
                                    <div className=' w-full'>
                                        <Button className='bg-[#002F34] w-full p-3  text-lg my-4 text-white' text="Chat with Seller" />
                                        <div className=' w-full text-center my-4 flex gap-4 justify-between font-medium'><FiPhone className='text-2xl' />{phoneNumberVisible ? item.phoneNumber : <div onClick={phoneNumberHandler} className='underline text-sm text-blue-700 cursor-pointer'>Show Number</div>} </div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ItemDetails

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
    const item = query['item'];
    if (!item) return {
        notFound: true,
    }

    try {
        const collectionRef = collection(db, 'SellPost');
        const docRef = doc(collectionRef, String(item));
        const document = await getDoc(docRef);
        if (document.data()) {
            // const newDate = document.data()!.createdAt.toDate();
            return {
                props: {
                    item: { ...document.data(), createdAt: moment(document.data()?.createdAt).fromNow() },
                }
            }
        }
        return {
            notFound: true,
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        }
    }
} 