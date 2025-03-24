import clsx from 'clsx';
import {MailIcon, MapIcon, PhoneIcon, TimerIcon} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {siteConfig} from '@/config/site';

export default function ContactsList({className}: React.AllHTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx('flex flex-col gap-6', className)}>
			<div className="flex flex-col gap-1">
				<h5 className="font-light text-gray-500">Адрес:</h5>
				<p className="break-words flex items-center gap-2">
					<MapIcon className="text-primary" size={20} />
					<Link className="font-medium hover:text-primary transition" href={'https://yandex.by/navi/-/CHeQRZz4'} target="_blank">{siteConfig?.contacts?.[2]?.text}</Link>
				</p>
			</div>
			<div className="flex flex-col gap-1">
				<h5 className="font-light text-left text-gray-500">Контакты:</h5>
				<ul className="flex flex-col">
					{siteConfig?.contacts?.[0]?.list?.map((item) => (
						<li key={item.label} className="self-start">
							<Link key={item.href} className="font-medium break-words text-left flex items-center gap-2 hover:text-primary transition" href={`tel:${item.href}` || '#'}>
								<PhoneIcon className="text-primary" size={20} />
								{item.label}
							</Link>
						</li>
					))}

					<li className="self-start">
						<Link className="font-medium break-words text-left flex items-center gap-2 hover:text-primary transition" href={`${siteConfig?.contacts?.[1]?.href}` || '#'}>
							<MailIcon className="text-primary" size={20} />
							{siteConfig?.contacts?.[1]?.text}
						</Link>
					</li>
				</ul>
			</div>

			<div className="flex flex-col gap-1">
				<h5 className="font-light text-gray-500">Время работы:</h5>
				<p className="font-medium break-words flex items-center gap-2">
					<TimerIcon className="text-primary" size={20} />
					{siteConfig?.contacts?.[3]?.text}
				</p>
			</div>
		</div>
	);
}
