'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {Select, SelectItem} from '@heroui/select';

export default function SortSelect() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentSort = searchParams.get('sort') || ''

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        const value = e.target.value

        if (value) {
            params.set('sort', value)
        } else {
            params.delete('sort')
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <Select label="Сортировать цены" radius="sm" selectedKeys={[currentSort]} size="sm" onChange={handleChange}>
            <SelectItem key="" textValue="Не выбрано">Не выбрано</SelectItem>
            <SelectItem key={'price-desc'} textValue="По убыванию" title='По убыванию'>По убыванию</SelectItem>
            <SelectItem key={'price-asc'} textValue="По возрастанию" title='По возрастанию'>По возрастанию</SelectItem>
        </Select>
    )
}
