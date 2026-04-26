'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Chip, CloseIcon } from '@heroui/react'

type FilterTag = {
	key: 'sort' | 'material' | 'color'
	label: string
	value: string
}

const SORT_LABELS: Record<string, string> = {
	'price-desc': 'Цена: по убыванию',
	'price-asc': 'Цена: по возрастанию',
}

function getSortLabel(value: string) {
	return SORT_LABELS[value] || value
}

export default function ActiveFilterTags() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const tags = useMemo<FilterTag[]>(() => {
		const sort = (searchParams.get('sort') || '').trim()
		const material = (searchParams.get('material') || '').trim()
		const color = (searchParams.get('color') || '').trim()
		const nextTags: FilterTag[] = []

		if (sort) {
			nextTags.push({
				key: 'sort',
				label: 'Сортировка',
				value: getSortLabel(sort),
			})
		}

		if (material) {
			nextTags.push({
				key: 'material',
				label: 'Материал',
				value: material,
			})
		}

		if (color) {
			nextTags.push({
				key: 'color',
				label: 'Цвет',
				value: color,
			})
		}

		return nextTags
	}, [searchParams])

	const updateParams = useCallback(
		(mutator: (params: URLSearchParams) => void) => {
			const params = new URLSearchParams(searchParams.toString())
			mutator(params)
			// Reset pagination when filters are changed.
			params.delete('page')
			const query = params.toString()
			router.push(query ? `${pathname}?${query}` : pathname)
		},
		[pathname, router, searchParams]
	)

	const removeFilter = useCallback(
		(key: FilterTag['key']) => {
			updateParams((params) => {
				params.delete(key)
			})
		},
		[updateParams]
	)

	const clearAll = useCallback(() => {
		updateParams((params) => {
			params.delete('sort')
			params.delete('material')
			params.delete('color')
		})
	}, [updateParams])

	if (tags.length === 0) {
		return null
	}

	return (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<Chip
					key={tag.key}
					className='gap-2'
					variant='primary'
					color='accent'
				>
					<div className='flex gap-1'>
						<span>{tag.label}:</span>
						<span className="font-bold max-w-[180px] truncate capitalize">{tag.value}</span>
					</div>
					<CloseIcon
						aria-label={`Удалить фильтр ${tag.label.toLowerCase()}`}
						className="transition hover:cursor-pointer text-lg"
						onClick={() => removeFilter(tag.key)}
						type="button"
					>
					</CloseIcon>
				</Chip>
			))}
			<button
				className="rounded-full border border-transparent px-2 py-0.5 text-xs text-primary transition hover:border-primary/30 hover:bg-primary/5 hover:cursor-pointer"
				onClick={clearAll}
				type="button"
			>
				Сбросить фильтры
			</button>
		</div>
	)
}
