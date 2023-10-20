import React from "react";

function Card({ product, addToCard }) {
  const addToCardHandler = (product) => {
    addToCard(product);
  };
  return (
    <div className="bg-white border border-slate-300 rounded-md transition-all md:hover:-translate-y-[6px]">
      <div className="p-3 md:p-5 cursor-auto md:cursor-pointer">
        <div className="relative flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-[120px] md:w-[240px]"
          />
          {product.off !== 0 && (
            <span class="absolute right-1.5 top-1.5 rounded-full bg-red-600 text-white dark:text-zinc-700 h-5 md:h-[30px] text-xs/[24px] md:text-base/[34px] font-DanaMedium px-2.5 md:px-3.5">
              {product.off}%
            </span>
          )}
        </div>
        <div className="">
          <h2 className="font-DanaMedium text-sm md:text-xl text-zinc-700 dark:text-white line-clamp-1 mb-5 mt-5">
            {product.title}
          </h2>
          <div class="flex items-center gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5">
            <div class="text-teal-600 dark:text-emerald-500 flex items-center md:gap-x-1">
              <span class="font-DanaDemiBold text-sm md:text-xl">
                {product.price.toLocaleString()}
              </span>
              <span class="tracking-tight hidden md:block text-xs md:text-base">
                تومان
              </span>
            </div>
            {product.off !== 0 && (
              <div class="text-gray-400 offer relative flex items-center gap-x-1 md:gap-x-1">
                <span class="text-xs md:text-base">
                  {(
                    product.price -
                    (product.price * product.off) / 100
                  ).toLocaleString("fa")}
                </span>
                <span class="tracking-tight hidden md:block text-xs md:text-base">
                  تومان
                </span>
              </div>
            )}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div class="flex items-center gap-x-2 md:gap-x-4 cursor-pointer">
              <span
                class="flex-center w-[26px] h-[26px] md:w-9 md:h-9 bg-black hover:bg-teal-600 text-white hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white   dark:bg-zinc-800 rounded-full transition-all cursor-auto md:cursor-pointer"
                onClick={() => addToCardHandler(product)}
              >
                <svg class="w-[18px] h-[18px] md:w-[22px] md:h-[22px]">
                  <use href="#shopping-cart"></use>
                </svg>
              </span>
              <span class="text-gray-400 hover:text-teal-600 dark:hover:text-emerald-500 transition-all">
                <svg class="w-[18px] h-[18px] md:w-[24px] md:h-[24px]">
                  <use href="#arrows-right-left"></use>
                </svg>
              </span>
            </div>
            <div class="flex">
              {Array(5 - product.score)
                .fill(0)
                .map((score,index) => (
                  <svg key={index} class="w-4 h-4 md:w-6 md:h-6 text-gray-300 dark:text-gray-400">
                    <use href="#star"></use>
                  </svg>
                ))}
              {Array(product.score)
                .fill(0)
                .map((score , index) => (
                  <svg key={index} class="w-4 h-4 md:w-6 md:h-6 text-yellow-400 dark:text-gray-400">
                    <use href="#star"></use>
                  </svg>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
