import { BrandButtonProps } from '@/types'
import { Button } from '@heroui/button'
import clsx from 'clsx'
import React from 'react'

export default function BrandButton({ state, className, onPress, children }: BrandButtonProps) {
    return (
        <Button onPress={onPress} size='lg' radius='sm' color={state !== null ? state : undefined} variant={'shadow'}
            className={clsx(
                { 'bg-brand-gradient font-semibold': state === 'primary' },
                { 'brand-gradient-border bg-brand-gradient text-fill-transparent': state === 'secondary' },
                className
            )}
        >{children}</Button>
    )
}
