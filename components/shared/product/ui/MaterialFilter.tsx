'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {Select, SelectItem} from '@heroui/select';

export default function MaterialFilter({ materials }: { materials: string[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeMaterial = searchParams.get('material') || ''

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        const value = e.target.value

        if (value) {
            params.set('material', value)
        } else {
            params.delete('material')
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <Select
            label="Материал"
            placeholder="Выберите материал"
            radius="sm"
            selectedKeys={[activeMaterial]}
            size="sm"
            onChange={handleChange}
        >
            <SelectItem key="" textValue="Все материалы">
                Все материалы
            </SelectItem>
            {(materials as any)?.map((item: string) => (
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
