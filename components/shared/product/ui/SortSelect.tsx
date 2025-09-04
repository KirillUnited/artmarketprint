"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {Select, SelectItem} from "@heroui/select";

export default function SortSelect() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentSort = searchParams.get("sort") || ""

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        const value = e.target.value

        if (value) {
            params.set("sort", value)
        } else {
            params.delete("sort")
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <div className="flex items-center gap-2">
            <Select size="sm" radius="sm" label="Сортировать цены" selectedKeys={[currentSort]} onChange={handleChange}>
                <SelectItem textValue="Не выбрано" key="">Не выбрано</SelectItem>
                <SelectItem textValue="По убыванию" key={"price-desc"}>По убыванию</SelectItem>
                <SelectItem textValue="По возрастанию" key={"price-asc"}>По возрастанию</SelectItem>
            </Select>
        </div>
    )
}
