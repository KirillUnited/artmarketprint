import React, {JSX} from 'react';
import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { SearchIcon } from 'lucide-react';
import { Button } from '@heroui/button';
import clsx from 'clsx';

/**
 * A form for searching products.
 *
 * @returns A `Form` component containing an `Input` and a `Button`.
 */
export default function ProductSearchForm({ className }: { className?: string }): JSX.Element {
    return (
		<Form action={'/search'} className={clsx('flex-row flex-1', className)}>
			<Input
				className="flex-1"
				classNames={{inputWrapper: 'border bg-white'}}
				labelPlacement="outside"
				name="query"
				placeholder="Поиск товара..."
				radius="sm"
				size='md'
				startContent={<SearchIcon size={16} />}
				type="search"
				variant="bordered"
			/>
			<Button className="self-stretch min-w-max" color="primary" radius="sm" type="submit">
				<SearchIcon aria-label="Найти" className="" size={16} />
				{/*<span className="hidden md:block">Найти</span>*/}
			</Button>
		</Form>
	);
}
