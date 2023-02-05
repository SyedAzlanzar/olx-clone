import React, { useState } from 'react'
import { PostCategories } from '../PostCategories/PostCategories'
import PostForm from '../PostForm/PostForm'

const PostFormContainer = () => {
    const [isChange, setIsChange] = useState(false)

    const isChangeHandler = () => {
        setIsChange((prev) => !prev)
    }

    return (
        <>
            <div className='w-8/12 mx-auto bg-slate-50 border-1 rounded-md'>
                <h1 className='font-semibold text-xl my-3 mx-4'>SELECTED CATEGORY</h1>
                <span className='text-xs my-3 mx-4'>Mobiles / Smart Watches </span> <span className='underline font-semibold text-sm mx-2 cursor-pointer' onClick={isChangeHandler}>Change</span>
                {isChange ? <PostCategories className="w-full" /> : null}
                <PostForm />

            </div>
        </>
    )
}

export default PostFormContainer