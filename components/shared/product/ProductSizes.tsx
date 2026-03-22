import React from 'react'

export const ProductSizes = ({list}: any) => {
    return (
        <div className='flex flex-col gap-1'>
            <ul className='flex flex-wrap gap-1'>
                {
                    list.sort((a: any, b: any) => a.localeCompare(b)).map((size: any) => <li key={size} className='border rounded-small p-1 min-w-7 grid place-content-center' >{size}</li>)
                }
            </ul>
        </div>
    )
}
