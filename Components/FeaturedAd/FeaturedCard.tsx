import React, { useState } from 'react'
import Button from '../Button/Button'

const FeaturedCard = ({ pkg, handleCheckboxChange}: any) => {
    // function handleRemove(id: string) {
    //     const newList = packages.filter((item: any) => item.packageId === id);
    //     setList(...newList)
    // }


    return (
        <div  className='w-[150px] shadow-top  rounded-sm '>
            <div className='flex items-center justify-between px-3 py-2 '>
                <input type="checkbox" className='w-6 h-6 cursor-pointer' onChange={(event)=>handleCheckboxChange(event,pkg.packageId)} />
                <p className='font-medium'>{pkg.ads}</p>
            </div>
            <div className='border-b-1 border-gray-300'></div>
            <div className='text-sm font-medium text-center py-4 relative'>
                <p>Rs {pkg.price}</p>
                <p className='line-through text-gray-300'>Rs {pkg.previousPrice}</p>
                <div className='absolute top-4 left-[-0.7rem]'>
                    <img src="https://www.olx.com.pk/assets/businessMultiTag.a829cdefa1ba77d11fed885398b72c79.webp" alt="" />
                </div>
                <span className='top-5 absolute left-0 text-[11px]'>-16 %</span>
            </div>

        </div>

    )
}

export default FeaturedCard