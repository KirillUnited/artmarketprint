'use client'

import type { Key } from '@heroui/react'
import {
    Collection,
    ComboBox,
    EmptyState,
    Input,
    Label,
    ListBox,
    ListBoxLoadMoreItem,
    Spinner,
} from '@heroui/react'
import { useAsyncList } from '@react-stately/data'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef } from 'react'

/** Sentinel key for "all colors" (URL has no `color` param). */
const ALL_COLORS_KEY = '__all__'

const PAGE_SIZE = 40

interface ColorItem {
    name: string
}

export default function ColorFilter({ colors }: { colors: string[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeColor = searchParams.get('color') || ''

    const colorsRef = useRef(colors)
    colorsRef.current = colors

    const colorsKey = useMemo(() => colors.join('\0'), [colors])

    const list = useAsyncList<ColorItem, number>({
        getKey: (item) => item.name,
        async load({ cursor, filterText, signal }) {
            const all = colorsRef.current
            const q = (filterText ?? '').trim().toLowerCase()
            const filtered = q
                ? all.filter((c) => c.toLowerCase().includes(q))
                : [...all]

            await new Promise<void>((resolve) => {
                const t = setTimeout(resolve, 120)
                signal.addEventListener('abort', () => clearTimeout(t), { once: true })
            })
            if (signal.aborted) {
                return { items: [] }
            }

            const offset = cursor == null ? 0 : cursor
            const slice = filtered.slice(offset, offset + PAGE_SIZE)
            const items = slice.map((name) => ({ name }))
            const nextOffset = offset + PAGE_SIZE
            const hasMore = nextOffset < filtered.length

            return {
                items,
                cursor: hasMore ? nextOffset : undefined,
            }
        },
    })

    const reloadRef = useRef(list.reload)
    reloadRef.current = list.reload

    const isFirstColorsEffect = useRef(true)
    useEffect(() => {
        if (isFirstColorsEffect.current) {
            isFirstColorsEffect.current = false
            return
        }
        reloadRef.current()
    }, [colorsKey])

    const selectedValue: Key | null =
        activeColor === '' ? ALL_COLORS_KEY : activeColor

    const handleChange = useCallback(
        (value: Key | null) => {
            const params = new URLSearchParams(searchParams.toString())
            if (!value || value === ALL_COLORS_KEY) {
                params.delete('color')
                list.setFilterText('')
            } else {
                params.set('color', String(value))
                list.setFilterText(String(value))
            }
            router.push(`?${params.toString()}`)
        },
        [list, router, searchParams]
    )

    return (
        <ComboBox
            allowsEmptyCollection
            className="w-full min-w-0"
            fullWidth
            inputValue={list.filterText}
            value={selectedValue}
            onChange={handleChange}
            onInputChange={list.setFilterText}
        >
            <Label>Цвет</Label>
            <ComboBox.InputGroup>
                <Input placeholder="Выберите цвет" />
                <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
                <ListBox
                    renderEmptyState={() =>
                        list.loadingState === 'loading' ||
                        list.loadingState === 'filtering' ||
                        list.loadingState === 'sorting' ? (
                            <div className="flex justify-center py-4">
                                <Spinner size="sm" />
                            </div>
                        ) : (
                            <EmptyState />
                        )
                    }
                >
                    <ListBox.Item id={ALL_COLORS_KEY} textValue="Все цвета">
                        Все цвета
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <Collection items={list.items}>
                        {(item) => (
                            <ListBox.Item
                                className="capitalize"
                                id={item.name}
                                textValue={item.name}
                            >
                                {item.name}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        )}
                    </Collection>
                    <ListBoxLoadMoreItem
                        isLoading={list.loadingState === 'loadingMore'}
                        onLoadMore={list.loadMore}
                    >
                        <div className="text-muted flex items-center justify-center gap-2 py-2 text-sm">
                            <Spinner size="sm" />
                            <span>Загрузка…</span>
                        </div>
                    </ListBoxLoadMoreItem>
                </ListBox>
            </ComboBox.Popover>
        </ComboBox>
    )
}
