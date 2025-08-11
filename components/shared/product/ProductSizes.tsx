import React from 'react'

export const ProductSizes = ({list}: any) => {
    return (
        <div className='flex flex-col gap-1'>
            <span className='font-semibold'>Размеры:</span>
            <ul className='flex flex-wrap gap-1'>
                {
                    list.sort((a: any, b: any) => a.localeCompare(b)).map((size: any) => <li className='border-1 rounded-small p-1 min-w-7 grid place-content-center' key={size} >{size}</li>)
                }
            </ul>
        </div>
    )
}
