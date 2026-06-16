'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type FooterNavLink = {
	title: string;
	url?: string;
};

export function FooterNavList({ links }: { links: FooterNavLink[] }) {
	const pathname = usePathname();

	return (
		<ul className="flex flex-col gap-4">
			{links?.map((link, index) => {
				const isCurrent = !!link.url && link.url === pathname;
				return (
					<li key={index}>
						{isCurrent ? (
							<span
								aria-current="page"
								className="text-[#eeeeee] text-left font-medium self-stretch transition cursor-default"
							>
								{link.title}
							</span>
						) : (
							<Link
								className="text-[#eeeeee] text-left font-medium self-stretch hover:text-primary transition"
								href={link.url ?? '#'}
							>
								{link.title}
							</Link>
						)}
					</li>
				);
			})}
		</ul>
	);
}
