import React from 'react'
import {BsFillSuitHeartFill} from "react-icons/bs";
function Footer() {
  return (
    <div className='bg-black text-white flex items-center justify-center gap-x-2 font-DanaDemiBold text-xl md:text-3xl py-20 mt-10'>
        توسعه داده شده با
        <span className='text-red-600 block'>
            <BsFillSuitHeartFill/>
        </span>
        در میلاد شاپ
    </div>
  )
}

export default Footer