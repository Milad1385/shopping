import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../../contexts/ProductContext'
import Card from '../../Components/Card/Card';
import ShoppingBag from '../../Components/ShoppingBag/ShoppingBag';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
    const [currentPage , setCurrentpage] = useState(1);
    const [paginatedProducts , setPaginatedProducts]= useState([]);
    const [searchValue , setSearchValue] = useState('');
    const [sortTitle , setSortTitle]= useState('جستجو بر اساس پیش فرض');
    const [sortType , setSortType] = useState('')
    const contextData = useContext(ProductsContext);
    let pageSize = 4;

    useEffect(()=>{
        let endIndex = currentPage * pageSize;
        let startIndex = endIndex - pageSize;
        const paginationProducts = allProducts.slice(startIndex , endIndex);
        console.log(paginationProducts);
        setPaginatedProducts(paginationProducts)
        
    },[])

    useEffect(()=>{
        let endIndex = currentPage * pageSize;
        let startIndex = endIndex - pageSize;
        const paginationProducts = allProducts.slice(startIndex , endIndex);
        console.log(paginationProducts);
        setPaginatedProducts(paginationProducts)
    },[currentPage])
    

    const addToCard = (product)=>{

        const isInBasket = contextData.userBasket.some(basket => basket.title === product.title);
        if(isInBasket){
            contextData.userBasket.some(basket =>{
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
            contextData.setUserBasket(userBasket)
        }else{
            const newProductObj = {
                id : contextData.userBasket.length + 1,
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
            contextData.setUserBasket(prevbasket => [...prevbasket , newProductObj]);
        }

        
    }

    let allProducts = [];

    for (let i = 0; i < contextData.allProduct.length; i++) {
        let category = contextData.allProduct[i].allProducts;
        for (let j = 0; j < category.length; j++) {
            allProducts.push(category[j]);
        }
    }

    const pageNumber = Math.ceil(allProducts.length / pageSize);
    const paginatedNumberArray = Array.from(Array(pageNumber).keys());

    const changeCurrentPage = (page)=>{
        setCurrentpage(page);
    }

    

    const handleSort = (e)=>{
        setSortTitle(e.target.textContent)
        setSortType(e.target.dataset.sort);
        handleProductSort()
    }

    const handleProductSort = ()=>{
        switch(sortType){
            case "Off":
                const filtredProductByOff = [...paginatedProducts].sort((a,b)=> b.off - a.off);
                console.log(filtredProductByOff);
                setPaginatedProducts(filtredProductByOff);
                break;
            case "High":
                const filtredProductByHigh = [...paginatedProducts].sort((a,b)=> b.price - a.price);
                setPaginatedProducts(filtredProductByHigh);
                break;
            case "Low":
                const filtredProductByLow = [...paginatedProducts].sort((a,b)=> a.price - b.price);
                setPaginatedProducts(filtredProductByLow);
                break;
            default :
                setPaginatedProducts(paginatedProducts);
                break;
        }
    }

    const filtredProducts = paginatedProducts.filter(product => product['title'].includes(searchValue));

    
  return (
    <div className='mt-10'>
        <div className='bg-white shadow-sm border border-slate-300 rounded-md p-5 flex md:items-center justify-between flex-col md:flex-row'>
            <div className='relative group'>
                <div className='bg-gray-100 w-full md:w-64 mb-5 md:mb-0 cursor-default md:cursor-pointer px-3 py-2 border border-slate-300 rounded-md flex items-center justify-between'>
                    <span className='text-sm md:text-base'>{sortTitle}</span>
                    <svg className='w-5 h-5'>
                        <use href='#chevron-down'></use>
                    </svg>
                </div>
                <div className='absolute text-sm md:text-base opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all space-y-3 cursor-default md:cursor-pointer z-40 bg-white left-0 right-0 shadow px-3 py-3'>
                    <div data-sort='Default' className={`hover:bg-black ${sortTitle === 'مرتب سازی بر اساس پیش فرض'?'bg-black text-white':''}  hover:text-white transition-all py-2 px-2 rounded-md`} onClick={handleSort}>مرتب سازی بر اساس پیش فرض</div>
                    <div data-sort='Off' className={`hover:bg-black ${sortTitle === 'مرتب سازی بر اساس تخفیف'?'bg-black text-white':''} hover:text-white transition-all py-2 px-2 rounded-md`} onClick={handleSort}>مرتب سازی بر اساس تخفیف</div>
                    <div data-sort='High' className={`hover:bg-black ${sortTitle === 'مرتب سازی بر اساس ارزان ترین'?'bg-black text-white':''} hover:text-white transition-all py-2 px-2 rounded-md`} onClick={handleSort}>مرتب سازی بر اساس ارزان ترین</div>
                    <div data-sort='Low' className={`hover:bg-black ${sortTitle === 'مرتب سازی بر اساس گران ترین'?'bg-black text-white':''} hover:text-white transition-all py-2 px-2 rounded-md`} onClick={handleSort}>مرتب سازی بر اساس گران ترین</div>
                </div>
            </div>
            
            <div className=''>
                <div className='bg-gray-100 text-sm md:text-base  rounded-md px-2 py-2 border border-slate-300 shadow-sm flex items-center justify-between'>
                    <input type='text' value={searchValue} placeholder='جستجو کنید...' className='outline-none bg-transparent' onChange={(e)=>setSearchValue(e.target.value)}/>
                    <svg className='w-5 h-5'>
                        <use href='#magnify'></use>
                    </svg>
                </div>
            </div>
        </div>
        <>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
                {
                    filtredProducts.length ? (
                        filtredProducts.map(product=>(
                            <>
                                <Card product={product} addToCard={addToCard} key={product.id}/>
                            </>
                        ))
                    ):(
                        <div className='font-MorabbaBold col-span-12 py-10 md:py-16 rounded-md shadow mt-12 flex items-center justify-center text-white bg-red-600 text-lg md:text-2xl lg:text-4xl w-full'>
                                محصولی مطابق با جستجو شما پیدا نشد
                            </div>
                    )
                }
                </div>
                <ShoppingBag/>
                </>
            <div className='flex items-center justify-center gap-x-3 mt-16 md:mt-8'>
                {paginatedNumberArray.map(pagination =>(
                    <div className={`${pagination + 1 === currentPage ? 'active ':'non-active'} border border-slate-300 w-11 hover:bg-black hover:text-white transition-all flex items-center justify-center px-4 py-2 rounded-md shadow-sm cursor-none md:cursor-pointer`} onClick={()=>changeCurrentPage(pagination + 1)}>
                        <span>{pagination + 1}</span>
                    </div>
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

export default Products