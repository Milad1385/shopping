import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import ProductSection from '../../Components/ProductSection/ProductSection'
import ShoppingBag from '../../Components/ShoppingBag/ShoppingBag'

function Home() {
  return (
    <>
      <div>
        <h1 className='text-red-600 text-2xl md:text-5xl font-DanaDemiBold mt-16 text-center'>تمام محصولات</h1>
        <ProductSection/>
        <ShoppingBag/>
      </div>
    </>
  )
}

export default Home