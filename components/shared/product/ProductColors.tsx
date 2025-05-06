import React from 'react'
import NextImage from 'next/image'

export const ProductColors = ({ list }: { list: any }) => {
    return (
        <div className='flex flex-col gap-1'>
            <span className='font-semibold'>Варианты:</span>
            <ul className='flex gap-2 flex-wrap'>
                {
                    list?.map((item: any)=>{
                        return (
                            <NextImage
                                alt={item.color}
                                key={item.id}
                                src={item.cover} width={36} height={36} 
                                className="object-contain aspect-square"
                                quality={10}
                                title={item.color}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}
