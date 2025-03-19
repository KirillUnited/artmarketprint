import { Radio } from '@heroui/radio';
import clsx from 'clsx';
import React from 'react';

const CustomRadio = (props: { children: React.ReactNode } & React.ComponentProps<typeof Radio>) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: clsx(
                    "inline-flex flex-1 m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-small gap-4 p-4 border-1 border-gray-300",
                    "data-[selected=true]:border-primary",
                ),
                description: 'mt-2'
            }}
        >
            {children}
        </Radio>
    );
};

export default CustomRadio; 