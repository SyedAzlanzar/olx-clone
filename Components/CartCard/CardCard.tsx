import React, { useState } from 'react'
import Button from '../Button/Button'
import { AiOutlineMinus } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"

const CartCard = ({ pkg, handleCheckboxChange , setTotal }: any) => {
    // function handleRemove(id: string) {
    //     const newList = packages.filter((item: any) => item.packageId === id);
    //     setList(...newList)
    // }
    const temp = []
    temp.push(...pkg.ads.match(/\d+/g))
    
    return (
        <div>
            <div className='w-3/4 shadow-top  rounded-sm my-5 mx-auto relative px-10 py-5'>
                <h1 className='font-medium'>Post {pkg.ads}</h1>
                <p className='text-sm'>Unit Price = {pkg.price / temp[0]}PKR - Valid for 90 Days</p>
                <div className='flex items-start justify-between mt-6 h-11 '>
                    <div>
                        <h1 className='text-md font-medium'>Rs {pkg.price}</h1>
                        <p className='font-medium text-sm text-gray-400 line-through'>Rs {pkg.previousPrice}</p>
                    </div>
                    <div className='flex items-center justify-between gap-2 border-1 text-lg h-10 px-2'>
                        <AiOutlineMinus /> <span>1</span> <AiOutlinePlus />
                    </div>
                </div>
                <img src="https://www.olx.com.pk/assets/businessMultiTag.a829cdefa1ba77d11fed885398b72c79.webp" alt="" className='absolute top-4 left-[-0.66em] ' />
                <div className='absolute top-5 left-0 text-xs'>{pkg.discount}</div>
            </div>
        </div>

    )
}

export default CartCard