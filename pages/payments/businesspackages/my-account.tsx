import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import SellHeader from '../../../Components/SellHeader/SellHeader'
import { db } from '../../../firebase/config/firebase'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Button from '../../../Components/Button/Button'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'


const MyAccount = ({ categoryItem }: any) => {
    const router = useRouter()
    const colletionRef = collection(db, 'Categories')
    const [subItem, setSubItem] = useState([]);
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [categorySubOpen, setSubCategoryOpen] = useState(false)
    const [isSave, setIsSave] = useState<any>({ title: "Select Category*" })
    const [isArrowOpen, setIsArrowOpen] = useState(false)

    const categoryHandler = () => {
        setIsArrowOpen((prev) => !prev)
        setCategoryOpen(prev => !prev)

    }

    const subCategoryHandler = () => {
        setSubCategoryOpen(prev => !prev)
    }


    const selectHandler = (item: any) => {
        setIsSave(item)

    }


    return (
        <>
            <div className=' h-screen '>
                <SellHeader />
                <div className='flex items-center justify-center h-5/6'>
                    <div className='border-1 border-black w-1/4 p-5 rounded-md'>
                        <div className='flex items-start justify-center'>
                            <div>
                                <h1 className='text-xl font-medium'>SELECT OPTIONS TO SHOW PACKAGES
                                </h1>
                                <div onClick={categoryHandler} className='flex items-center justify-between w-full my-7 border-1 border-black p-3  rounded cursor-pointer relative top-0'>
                                    <div className=' w-full flex justify-between  '> <label htmlFor="" >{isSave.title}</label>
                                        {!isArrowOpen ? <MdOutlineKeyboardArrowDown className='text-2xl ' /> :
                                            <MdOutlineKeyboardArrowUp className='text-2xl ' />}
                                    </div>
                                    {categoryOpen ?
                                        <ul className='absolute top-14 bg-white z-10 w-full left-0 px-3 shadow-top  rounded'>
                                            {categoryItem.map((item: any, index: number) => {
                                                return (
                                                    <li
                                                        onClick={() => selectHandler(item)}
                                                        key={index}
                                                        className={` gap-5 text-lg hover:bg-[#C8F8F6]`}
                                                    >
                                                        <div className="flex items-center gap-5 h-8 text-base my-1  mx-4 cursor-pointer ">

                                                            <span>{item.title}</span>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul> : null
                                    }
                                </div>


                                <div onClick={subCategoryHandler} className='flex items-center justify-between w-full my-7 border-1 border-black p-3 rounded cursor-pointer relative'>
                                    <label htmlFor="" >Select Subcategory</label>
                                    <MdOutlineKeyboardArrowDown className='text-2xl ' />
                                </div>

                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <Button onClick={() => isSave.id ? router.push(`/payments/${isSave.id}`) :
                                toast("Please Select a Category", {
                                    hideProgressBar: true,
                                    autoClose: 1000,
                                    type: "info",
                                    position: "top-right",
                                })} text="Show Packages" className='text-md font-medium bg-[#002F34] text-white p-2 px-5'
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MyAccount


export async function getServerSideProps() {
    console.log(1)
    try {
        const colletionRef = collection(db, 'Categories')
        const q = query(colletionRef, where("parentId", "==", null))

        const items: any = [];
        const subItems: any = []
        const res = await getDocs(q);
        res.docs.map(async (item) => {
            items.push({ ...item.data(), id: item.id })
        })
        if (items) {
            return {
                props: {
                    categoryItem: items,
                }
            }
        }
        return {
            notFound: true
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        }
    }
}

