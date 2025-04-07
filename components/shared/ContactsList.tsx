import clsx from 'clsx';
import { MailIcon, MapIcon, PhoneIcon, TimerIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export interface ContactsListProps extends React.AllHTMLAttributes<HTMLDivElement> {
	items: {
		address: Array<{ _key: string, location: string; link: string }>;
		emails: Array<{ _key: string, email: string; link: string }>;
		phones: Array<{ _key: string, number: string; link: string }>;
		workingHours: string;
	};
}

/**
 * Contacts list component
 * @param {ContactsListProps} props - Component props
 * @returns {React.ReactElement} Contacts list component
 */
export default function ContactsList({ items, className }: ContactsListProps) {
	const address = items?.address;
	const emails = items?.emails;
	const phones = items?.phones;
	const workingHours = items?.workingHours;

	// If no items are provided, do not render the component
	if (!address || !emails || !phones || !workingHours) return null;

	return (
		<div className={clsx('flex flex-col gap-6', className)}>
			<div className="flex flex-col gap-1">
				<p className="font-light">Адрес:</p>
				<p className="break-words flex items-center gap-2">
					<MapIcon className="text-primary" size={20} />
					<Link className="font-medium hover:text-primary transition" href={`${address[0]?.link}`} target="_blank">{address[0]?.location}</Link>
				</p>
			</div>
			<div className="flex flex-col gap-1">
				<p className="font-light text-left">Контакты:</p>
				<ul className="flex flex-col">
					{phones?.map((item) => (
						<li key={item._key} className="self-start">
							<Link className="font-medium break-words text-left flex items-center gap-2 hover:text-primary transition" href={`tel:${item.link}` || '#'}>
								<PhoneIcon className="text-primary" size={20} />
								{item.number}
							</Link>
						</li>
					))}

					{emails?.map((item) => (
						<li key={item._key} className="self-start">
							<Link className="font-medium break-words text-left flex items-center gap-2 hover:text-primary transition" href={`mailto:${item.link}` || '#'}>
								<MailIcon className="text-primary" size={20} />
								{item.email}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className="flex flex-col gap-1">
				<p className="font-light">Время работы:</p>
				<p className="font-medium break-words flex items-center gap-2">
					<TimerIcon className="text-primary" size={20} />
					{workingHours}
				</p>
			</div>
		</div>
	);
}
