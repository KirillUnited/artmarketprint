import { Input } from '@heroui/input'
import React from 'react'

export default function CartFormInput(props: React.ComponentProps<typeof Input>) {
    return (
        <Input
            color="primary"
            labelPlacement='outside'
            radius='sm'
            variant="bordered"
            classNames={{
                inputWrapper: 'border-1 bg-background',
            }}
            {...props}
        />
    )
}
