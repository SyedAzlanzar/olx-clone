import React, { useState } from 'react'

const ImageSlider = ({ postImage, id, setCounter, counter }: any) => {
    const [border, setBorder] = useState(id)
    return (
        <div className='flex w-24 h-24 m-4' onClick={() => {
            setCounter(id)
            setBorder(id)
        }} >
            <img src={postImage} className={`object-cover  ${border === counter ? "border-3 border-black" : null}`} alt="" />
        </div>
    )
}

export default ImageSlider