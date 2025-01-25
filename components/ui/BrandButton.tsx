import { BrandButtonProps } from '@/types'
import { Button } from '@heroui/button'
import clsx from 'clsx'
import React from 'react'

export default function BrandButton({ state, children }: BrandButtonProps) {
    return (
        <Button size='lg' radius='sm' color={state !== null ? state : undefined} variant={'shadow'}
            className={clsx(
                { 'bg-brand-gradient': state === 'primary' },
                { 'brand-gradient-border bg-transparent bg-brand-gradient text-fill-transparent rounded-lg': state === 'secondary' },)}
        >{children}</Button>
    )
}
