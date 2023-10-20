import React, { useContext } from 'react'
import {BsArrowLeftShort} from "react-icons/bs";
import { ProductsContext } from '../../contexts/ProductContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../Card/Card';
function ProductSection() {
    const contextDatas = useContext(ProductsContext);
    const addToCard = (product)=>{

        const isInBasket = contextDatas.userBasket.some(basket => basket.title === product.title);
        if(isInBasket){
            contextDatas.userBasket.some(basket =>{
                if(basket.title === product.title){
                    basket.count +=1
                    return true
                }
            })
            toast.warn('تعداد محصول اضافه شد', {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            contextDatas.setUserBasket(userBasket)
        }else{
            const newProductObj = {
                id : contextDatas.userBasket.length + 1,
                title : product.title,
                image : product.image,
                price : product.price,
                priceOff : product.price - (product.price * product.off /100),
                off : product.off,
                count : 1,
            }
            toast.success('محصول به سبد خرید اضافه شد', {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            contextDatas.setUserBasket(prevbasket => [...prevbasket , newProductObj]);
        }

        
    }
  return (
    <div>
        <div className='mt-10'>
            {contextDatas.allProduct.map(products=>(
                <>
                <div className='flex justify-between items-end mt-10'>
                    <div>
                        <h1 className='category relative mr-3 text-2xl md:text-3xl font-DanaMedium'>{products.category}</h1>
                        <span className='subCategory block relative mr-3 text-xs md:text-sm mt-1'>پیش به سوی {products.category} با کیفیت !</span>
                    </div>
                    <div className='flex items-center gap-x-1 cursor-pointer md:hover:bg-red-500/40 px-2 md:py-1 text-xs md:text-base rounded-md transition-all'>
                        <span>مشاهده همه محصولات</span>
                        <BsArrowLeftShort className='text-2xl'/>
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10'>
                    {products.allProducts.map(product=>(
                        <>
                            <Card product={product} addToCard={addToCard}/>
                        </>
                    ))}
                </div>
                </>
            ))}
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
    </div>
  )
}

export default ProductSection