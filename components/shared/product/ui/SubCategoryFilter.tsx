'use client'

import { Checkbox, CheckboxGroup, Label } from '@heroui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

type Subcategory = {
	title: string
	slug: string
}

type SubCategoryFilterProps = {
	category: { subcategories?: Subcategory[] } | null
	categorySlug: string
	activeSubcategory: Subcategory[] | Subcategory | null
	baseUrl: string
}

export default function SubCategoryFilter({
	category,
	categorySlug,
	activeSubcategory,
	baseUrl,
}: SubCategoryFilterProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const selectedSubcategories = useMemo(() => {
		if (Array.isArray(activeSubcategory)) {
			return activeSubcategory.map((sub) => sub.slug)
		}
		return activeSubcategory?.slug ? [activeSubcategory.slug] : []
	}, [activeSubcategory])

	const onChange = useCallback(
		(values: string[]) => {
			const params = new URLSearchParams(searchParams.toString())

			if (values.length === 0) {
				params.delete('sub')
			} else {
				params.set('sub', values.join(','))
			}

			// Reset pagination when filters change.
			params.delete('page')
			const query = params.toString()
			router.push(`${baseUrl}/${categorySlug}${query ? `?${query}` : ''}`)
		},
		[baseUrl, categorySlug, router, searchParams]
	)

	return (
		<div className="md:sticky top-20 z-30 flex flex-col gap-2 md:self-start">
			<CheckboxGroup
				className="text-gray-900"
				name="subcategories"
				value={selectedSubcategories}
				onChange={onChange}
			>
				<Label className="text-lg font-semibold">Подкатегории</Label>
				{category?.subcategories?.map((sub) => (
					<Checkbox key={sub.slug} value={sub.slug} id={sub.slug}>
						<Checkbox.Control>
							<Checkbox.Indicator />
						</Checkbox.Control>
						<Checkbox.Content>
							<Label htmlFor={sub.slug} className="text-base">{sub.title}</Label>
						</Checkbox.Content>
					</Checkbox>
				))}
			</CheckboxGroup>
		</div>
	)
}
