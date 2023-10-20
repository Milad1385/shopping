import React, { useContext } from 'react'
import {AiOutlineClose} from "react-icons/ai";
import{BiShoppingBag} from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {AiOutlineMinusCircle} from "react-icons/ai";
import {MdAddShoppingCart} from "react-icons/md";
import { ProductsContext } from '../../contexts/ProductContext';
import { ToastContainer, toast } from 'react-toastify';
function ShoppingBag() {
  const contextData = useContext(ProductsContext);

  const hideModal = (event)=>{
    console.log(event.target.className);
    if(event.target.className.includes('Modal')){
      contextData.setIsShowMenu(false)
    }
  }

  const deleteBasket = (basketId)=>{
    const mainProducts = contextData.userBasket.filter(basket => basket.id !== basketId);
    toast.success('محصول با موفقیت حذف شد', {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
  });
    contextData.setUserBasket(mainProducts);
  }

  const increaseBasketCount = (basketId)=>{
    const mainBasket=contextData.userBasket.map(basket =>{
      if(basket.id === basketId){
        basket.count+=1;
      }
      return basket
    })
    contextData.setUserBasket(mainBasket)
  }

  const decreaseBasketCount = (basketId)=>{
    const mainBasket=contextData.userBasket.map(basket =>{
      if(basket.id === basketId){
        if(basket.count >1){
          basket.count-=1;
        }
      }
      return basket
    })
    contextData.setUserBasket(mainBasket)
  }

  const CalcTotalPrice = () =>{
    const totalPrice = contextData.userBasket.reduce((product , curr)=>{
      return product + curr.price * curr.count
    },0)

    return totalPrice
  }

  const calcOffPrice = ()=>{
    const totalOff = contextData.userBasket.reduce((product , curr)=>{
      return product + (curr.price * curr.count - (curr.priceOff * curr.count))
    },0)
    return totalOff
  }

  
  return (
    <aside className={`Modal fixed inset-0 flex items-center justify-end bg-black/50 w-full h-full ${contextData.isShowMenu ? 'active-modal':'non-active-modal'}  transition-all`} onClick={hideModal}>
      <div className={`bag-conatiner fixed bottom-0 top-0 ${contextData.isShowMenu ?'left-0' : '-left-[400px] md:-left-[260px]'}   w-[260px] lg:w-[400px] p-5 overflow-auto transition-all`}>
        <div className='bag-title flex items-center justify-between'>
          <div className='cursor-default md:cursor-pointer'>
            <AiOutlineClose className='text-xl md:text-3xl' onClick={()=> contextData.setIsShowMenu(false)}/>
          </div>
          <div className='flex items-center gap-x-5'>
            <span className='text-lg md:text-2xl'>سبد خرید</span>
            <BiShoppingBag className='text-xl md:text-4xl'/>
          </div>
        </div>
        <div className='mt-5'>
          {contextData.userBasket.length ?
            contextData.userBasket.map(basket=>(
              <div className='mb-4' key={basket.id}>
                <div className='bg-white shadow-sm flex items-center justify-center  flex-col pt-3 pb-4 px-4 rounded-md border border-slate-300 cursor-auto md:cursor-pointer'>
                  <div className='relative'>
                    <span className='absolute -left-10 top-1.5 text-base md:text-3xl text-red-600 border border-red-600 rounded p-1' onClick={()=>deleteBasket(basket.id)}>
                      <MdDelete/>
                    </span>
                    <img src={basket.image} alt="mac" className='w-[120px] md:w-[240px]' />
                    <span class="absolute -right-10 top-1.5 rounded-full bg-red-600 text-white dark:text-zinc-700 h-5 md:h-[30px] text-xs/[24px] md:text-base/[34px] font-DanaMedium px-2.5 md:px-3.5">{basket.off}%</span>
                  </div>
                  <div className=''>
                    <h2 className='font-DanaMedium text-sm md:text-xl'>{basket.title}</h2>
                    <div className='bg-black text-white flex items-center justify-center gap-x-2 rounded-md mt-3 py-1'>
                      <span className='line-through decoration-red-600 text-base md:text-xl'>{basket.price.toLocaleString('fa')}</span>
                      <span className='tracking-tighter text-teal-600 text-xs md:text-base'>تومان</span>
                    </div>
                    <div className='flex items-center justify-center gap-x-2 mt-3'>
                      <span className='text-base md:text-xl font-DanaMedium'>{basket.priceOff.toLocaleString('fa')}</span>
                      <span className='tracking-tighter text-teal-600 text-xs md:text-base'>تومان</span>
                    </div>
                    <div className='flex items-center justify-center mt-3 gap-x-2.5'>
                      <div onClick={()=>increaseBasketCount(basket.id)}>
                        <AiOutlinePlusCircle className='text-xl md:text-3xl text-green-600'/>
                      </div>
                      <span className='flex items-center justify-center bg-black text-white rounded-md px-3 text-sm md:text-xl'>
                        {basket.count}
                      </span>
                      <div onClick={()=>decreaseBasketCount(basket.id)}>
                        <AiOutlineMinusCircle className='text-xl md:text-3xl text-red-600'/>
                      </div>
                    </div>
                    <div className='flex items-center justify-center w-full mt-4 py-2 text-white shadow rounded-md bg-red-700 text-xs md:text-base font-DanaMedium'>
                      مشاهده بیشتر
                    </div>
                  </div>
                </div>
            </div>
            ))
          :(
            <div className='flex items-center justify-center my-48'>
              <div className='flex items-center justify-center flex-col'>
                <h2 className='font-DanaDemiBold text-xl md:text-3xl'>سبد خرید خالی است</h2>
                <MdAddShoppingCart className='text-4xl md:text-7xl mt-10'/>
              </div>
            </div>
          )}
        </div>
        {contextData.userBasket.length !==0 && (
          <div className='shadow-md border text-xs md:text-base border-slate-300 bg-white rounded-md p-4 space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='font-DanaMedium text-red-600'>مجموع : </div>
            <div className='flex items-center gap-x-1 font-DanaDemiBold'>{CalcTotalPrice().toLocaleString('fa')}
              <span className='text-teal-600 tracking-tighter font-DanaMedium'>تومان</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='font-DanaMedium text-red-600'>سود شما : </div>
            <div className='flex items-center gap-x-1 font-DanaDemiBold'>{calcOffPrice().toLocaleString('fa')}
              <span className='text-teal-600 tracking-tighter font-DanaMedium'>تومان</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='font-DanaMedium text-red-600'> قابل پرداخت : </div>
            <div className='flex items-center gap-x-1 font-DanaDemiBold'>{(CalcTotalPrice() - calcOffPrice()).toLocaleString('fa')}
              <span className='text-teal-600 tracking-tighter font-DanaMedium'>تومان</span>
            </div>
          </div>
        </div>
        )}
      </div>
      <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </aside>
    
  )
}

export default ShoppingBag