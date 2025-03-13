import React from 'react';
import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { SearchIcon } from 'lucide-react';
import { Button } from '@heroui/button';

export default function ProductSearchForm() {
    return (
        <Form action={'/search'} className='flex flex-col gap-4'>
            <Input classNames={{ inputWrapper: 'border-1' }} labelPlacement='outside' name='query' placeholder='Поиск товара...' radius='sm' size='md' startContent={<SearchIcon size={16} />} type='search' variant='bordered' />
            <Button color='primary' type='submit' radius='sm'>Найти</Button>
        </Form>
    )
}
