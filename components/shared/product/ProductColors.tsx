import React from 'react'

export const ProductColors = ({ list }: { list: any }) => {
    return (
        <div className='flex flex-col'>
            <span className='font-semibold'>Цвета:</span>
            <ul className='flex gap-2 flex-wrap'>
                {
                    list.map((color: any) => color).join(', ')
                    // item.items?.map((item: any)=>{
                    //     return (
                    //         <NextImage
                    //             alt={item.product[0]._}
                    //             key={item._id}
                    //             src={item.images_urls[0]?.split(',')[0] || item.image} width={36} height={36} 
                    //             className="object-contain aspect-square"
                    //             quality={10}
                    //         />
                    //     )
                    // })
                }
            </ul>
        </div>
    )
}
