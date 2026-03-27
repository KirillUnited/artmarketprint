'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {Select, SelectItem} from '@heroui/select';

export default function ColorFilter({ colors }: { colors: string[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeColor = searchParams.get('color') || ''

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        const value = e.target.value

        if (value) {
            params.set('color', value)
        } else {
            params.delete('color')
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <Select
            label="Цвет"
            placeholder="Выберите цвет"
            radius="sm"
            selectedKeys={[activeColor]}
            size="sm"
            onChange={handleChange}
        >
            <SelectItem key="" textValue="Все цвета">
                Все цвета
            </SelectItem>
            {(colors as any)?.map((item: string) => (
                <SelectItem
                    key={item}
                    className="capitalize"
                    textValue={item}
                    title={item}
                >
                    {item}
                </SelectItem>
            ))}
        </Select>
    )
}
