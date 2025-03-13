import React from 'react';
import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { SearchIcon } from 'lucide-react';
import { Button } from '@heroui/button';

/**
 * A form for searching products.
 *
 * @returns A `Form` component containing an `Input` and a `Button`.
 */
export default function ProductSearchForm(): JSX.Element {
    return (
        <Form action={'/search'} className='flex-row'>
            <Input className='flex-1' classNames={{ inputWrapper: 'border-1' }} labelPlacement='outside' name='query' placeholder='Поиск товара...' radius='sm' size='md' startContent={<SearchIcon size={16} />} type='search' variant='bordered' />
            <Button color='primary' type='submit' radius='sm' className='self-stretch min-w-max'>
                <SearchIcon size={16} className='md:hidden' />
                <span className='hidden md:block'>Найти</span>
            </Button>
        </Form>
    )
}
