'use client';
import {Button} from '@heroui/button';
import {ArrowRightIcon, TicketPercent, XIcon} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import clsx from 'clsx';

import Loader from '@/components/ui/Loader';

import styles from './styles.module.css';

export default function SalesBanner({isActive, title, description, discountPercentage, products}: any) {
	const [isVisible, setIsVisible] = useState(isActive);
	const [isLoading, setIsLoading] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (!isVisible) return null;

	if (isLoading) return <div className="container py-4"><Loader className='static text-primary flex mx-auto' size='md' variant='spinner' /></div>;

	return (
		<aside className={clsx(styles.banner)}>
			<div className="container max-w-screen-md">
				<div className="flex gap-3 md:items-center">
					<div className="flex flex-1 md:items-center gap-3">
						<div aria-hidden="true" className="bg-secondary/30 flex size-9 shrink-0 items-center justify-center rounded-full">
							<TicketPercent className="opacity-80" size={16} />
						</div>
						<div className="flex grow flex-col md:flex-row md:items-center justify-between gap-3">
							<div className="flex flex-1 flex-col gap-1">
								<p className="text-sm font-medium leading-none">{title}</p>
								{discountPercentage && (
									<p className="text-sm font-medium leading-none">
										Скидка <span className="text-lg font-bold leading-none">- {discountPercentage}%</span>
									</p>
								)}
								<p className="text-xs">{description}</p>
							</div>
							{products?.slug?.current && (
								<Link href={`/services/${products?.slug?.current}`}>
									<Button className="group font-medium whitespace-nowrap text-foreground" radius="sm" size="sm" target="_blank">
										Заказать
										<ArrowRightIcon aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" color="currentColor" size={12} />
									</Button>
								</Link>
							)}
						</div>
					</div>
					<Button isIconOnly aria-label="Close banner" className="group size-9 min-w-0 shrink-0 p-0 hover:bg-transparent" variant="ghost" onPress={() => setIsVisible(false)}>
						<XIcon aria-hidden="true" className="text-gray-800/60 transition-opacity group-hover:opacity-100 group-hover:text-black" size={16} />
					</Button>
				</div>
			</div>
		</aside>
	);
}
