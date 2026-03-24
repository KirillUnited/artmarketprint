import { Input } from '@heroui/input'
import React from 'react'

export default function FormInput(props: React.ComponentProps<typeof Input>) {
    return (
        <Input
            classNames={{
                inputWrapper: 'border bg-background',
            }}
            color="primary"
            labelPlacement='outside'
            radius='sm'
            variant="bordered"
            {...props}
        />
    )
}
