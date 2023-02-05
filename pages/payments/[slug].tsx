import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React from 'react'
import FeaturedAd from '../../Components/FeaturedAd/FeaturedAd'
import SellHeader from '../../Components/SellHeader/SellHeader'
import { db } from '../../firebase/config/firebase'


const slug = ({ packages }: any) => {
  
  return (
    <>
      <div className='h-screen relative flex justify-center items-center'>
        <SellHeader className="absolute top-0 w-full" />
        <FeaturedAd packages={packages} />

      </div>

    </>
  )
}

export default slug

export async function getServerSideProps() {
  try {
    const querySnapshot = await getDocs(collection(db, "packages"));
    const packages: any = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      packages.push({ ...doc.data(), packageId: doc.id })
    });
    if (packages.length !== 0) {
      return {
        props: {
          packages: packages
        }
      }
    }
    return {
      notFound: true
    }
  } catch (err) {
    console.log(err)
    return {
      notFound: true
    }
  }
}