// noinspection TypeScriptValidateTypes

import { Button } from '@heroui/button'
import clsx from 'clsx'
import React from 'react'

import { BrandButtonProps } from '@/types'

export default function BrandButton({ state, className, onPress, children, ...props }: BrandButtonProps) {
    return (
        <Button className={clsx(
                { 'bg-brand-gradient font-semibold': state === 'primary' },
                { 'brand-gradient-border bg-brand-gradient text-fill-transparent': state === 'secondary' },
                className
            )} color={state !== null ? state : undefined} radius='sm' size='lg' variant={'shadow'}
            onPress={onPress}
            {...props}
        >{children}</Button>
    )
}
