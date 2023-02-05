
import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { storage } from '../../firebase/config/firebase'
import {
    ref,
    uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid"
import { toast } from 'react-toastify'



const ImageUploader = ({ setImageUrls }: any) => {
    const [imageUpload, setImageUpload] = useState<File | null>();
    const [preview, setPreview] = useState<string | null>();
    const fileInputRef = useRef<any>();

    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/olx-clone-nextjs.appspot.com/o/`

    useEffect(() => {
        if (imageUpload) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(imageUpload);


        } else {
            setPreview(null);
        }
    }, [imageUpload]);


    const uploadFile = async (file: File) => {
        if (file == null) return;
        const imageRef = ref(storage, `/images/${file.name + v4()}`);
        try {
            await uploadBytes(imageRef, file).then((snapshot) => {
                toast("Image Uploaded Successfully", {
                    hideProgressBar: true,
                    autoClose: 500,
                    type: "success",
                    position: "bottom-right",
                });
                const urlName = snapshot.metadata.name
                const url = baseUrl + `images%2F${urlName}?alt=media`
                setImageUrls((prev: any) => [...prev, url])
            }).catch(err => console.log(err));

        } catch (error) {
            console.log(error)
        }
    };


    return (
        <fieldset className='h-24 w-24 border-2 border-black relative overflow-hidden'>
            {preview ? (
                <>
                    <RxCross2 className='absolute right-0 z-10 bg-[#f5f5f59a] p-1 text-3xl m-1 cursor-pointer text-red-700' onClick={() => {
                        setImageUpload(null);
                    }} />
                    <img
                        src={preview}
                        className="object-contain"
                        width="100%"
                        height={"100%"}
                    />
                </>
            ) : (
                <button
                    className='h-24 w-24 flex items-center justify-center'
                    onClick={async (event) => {
                        event.preventDefault();
                        fileInputRef.current.click();

                    }}
                >
                    <img src="https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg" alt="" />
                </button>
            )}
            <input
                className='hidden w-24'
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onInput={async (event: any) => {
                    const file = event.target.files[0];
                    if (file && file.type.substr(0, 5) === "image") {
                        await uploadFile(file)
                        setImageUpload(file);

                    } else {
                        setImageUpload(null);
                    }
                }}
            />
        </fieldset>
    );


}

export default ImageUploader