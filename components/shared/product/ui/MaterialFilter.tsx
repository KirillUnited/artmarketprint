"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {Select, SelectItem} from "@heroui/select";

export default function MaterialFilter({ materials }: { materials: string[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeMaterial = searchParams.get("material") || ""

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        const value = e.target.value

        if (value) {
            params.set("material", value)
        } else {
            params.delete("material")
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <Select
            size="sm"
            radius="sm"
            label="Материал"
            placeholder="Выберите материал"
            selectedKeys={[activeMaterial]}
            onChange={handleChange}
        >
            <SelectItem textValue="Все материалы" key="">
                Все материалы
            </SelectItem>
            {materials?.map((item) => (
                <SelectItem
                    className="capitalize"
                    key={item}
                    textValue={item}
                >
                    {item}
                </SelectItem>
            ))}
        </Select>
    )
}
