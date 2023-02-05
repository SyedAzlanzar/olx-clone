import React, { useState, useEffect } from 'react'
import SellHeader from '../../Components/SellHeader/SellHeader'
import PostFormContainer from '../../Components/PostFormContainer/PostFormContainer';

const postAd = () => {
    return (
        <>
            <SellHeader />
            <h1 className="text-center font-semibold my-6 text-xl ">POST YOUR AD</h1>

            <PostFormContainer />
            {/* <form action="" onClick={(e: any) => e.stopPropagation()}>
                    <input
                        type="file"
                        onChange={(event: any) => {
                            setImageUpload(event.target.files[0]);
                        }}
                    />
                    <button type='button' onClick={uploadFile}> Upload Image</button>
                </form> */}
        </>
    )
}

export default postAd