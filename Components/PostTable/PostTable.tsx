import { useRouter } from 'next/router'
import React, { useState } from 'react'

const PostTable = ({ item, PostTableHandler, PostTableTwoHandler }: any) => {
    const [isActive, setIsActive] = useState(false)
    const router = useRouter()
    const onClickHandler = () => {
        setIsActive(true)
        item.parentId === null ?
            PostTableHandler(item) : item.hasChildren ? PostTableTwoHandler(item) : router.push(`/post/${"attributes"}`)
    }
    return (
        <div onClick={onClickHandler} className={`flex items-center justify-between border-1 border-gray-300 py-2 px-3 cursor-pointer h-14 hover:bg-[#C8F8F6] `}>
            <span className='flex items-center gap-5'>
                <img src={item.icon} alt="" />
                <p className='text-sm' > {item.title}</p >
            </span >
            {item.parentId === null || item.hasChildren ? <span><svg xmlns="http://www.w3.org/2000/svg" height={18} viewBox="0 0 32 32"><path d="M7.55 3.36c-.8-.8-.7-2.1.1-2.8.8-.7 2-.7 2.7 0l14 14c.8.8.8 2 0 2.8l-14 14c-.8.8-2 .8-2.8.1-.8-.8-.8-2-.1-2.8l.1-.1 12.6-12.5-12.6-12.7z"></path></svg></span> : null}
        </div >
    )
}

export default PostTable