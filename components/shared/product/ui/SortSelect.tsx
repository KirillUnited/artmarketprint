'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Key } from 'react'
import { Label, ListBox, Select } from '@heroui/react'

export default function SortSelect() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentSort = searchParams.get('sort') || ''

    const handleChange = (value: Key | Key[] | null) => {
        const params = new URLSearchParams(searchParams.toString())
        const selected = Array.isArray(value) ? value[0] : value

        if (selected) {
            params.set('sort', String(selected))
        } else {
            params.delete('sort')
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <Select value={currentSort || null} placeholder="Не выбрано" onChange={handleChange}>
            <Label>Сортировка</Label>
            <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
                <ListBox>
                    <ListBox.Item id="" textValue="Не выбрано">
                        Не выбрано
                    </ListBox.Item>
                    <ListBox.Item id="price-desc" textValue="Цена: по убыванию">
                        Цена: по убыванию
                    </ListBox.Item>
                    <ListBox.Item id="price-asc" textValue="Цена: по возрастанию">
                        Цена: по возрастанию
                    </ListBox.Item>
                </ListBox>
            </Select.Popover>
        </Select>
    )
}
