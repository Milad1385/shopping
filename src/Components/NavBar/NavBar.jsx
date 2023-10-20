import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {AiOutlineShopping} from "react-icons/ai";
import { ProductsContext } from '../../contexts/ProductContext';

function NavBar() {
  const contextData = useContext(ProductsContext);
  console.log(contextData);
  return (
    <div className='bg-black px-4 md:px-16 py-5'>
        <nav className='flex items-center justify-between'>
            <div className='flex items-center gap-x-12'>
                <h3 className='font-MorabbaBold text-xl md:text-4xl text-red-600'>میلاد شاپ</h3>
                <div>
                  <ul className='flex text-white gap-x-5 font-DanaMedium text-sm md:text-lg'>
                    <li>
                      <NavLink to={'/'}>صفحه اصلی</NavLink>
                    </li>
                    <li>
                      <NavLink to={'/products'}>محصولات</NavLink>
                    </li>
                  </ul>
                </div>
            </div>
            <div className='text-white relative' onClick={()=> contextData.setIsShowMenu(true)}>
              <AiOutlineShopping className='text-4xl cursor-none md:cursor-pointer'/>
              <span className='absolute -top-1.5 -right-4 flex w-5 h-5 items-center justify-center text-xs md:text-base rounded-full bg-red-600 text-white'>{contextData.userBasket.length}</span>
            </div>
        </nav>
    </div>
  )
}

export default NavBar