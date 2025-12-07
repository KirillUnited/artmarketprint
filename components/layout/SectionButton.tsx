'use client';

import {Button} from '@heroui/button';
import {ArrowUpRightIcon} from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import {SectionProps} from '@/types';

export const SectionButton = ({label, href, className}: SectionProps) => (
	<Button
		as={Link}
		className={clsx('bg-brand-gradient text-fill-transparent', 'font-semibold border-1', 'group', className)}
		color="secondary"
		href={href}
		radius="sm"
		size="md"
		target="_blank"
		variant="bordered"
	>
		<span className="leading-none">{label}</span>
		<ArrowUpRightIcon className="text-secondary group-hover:translate-x-1 transition-transform" size={18} />
	</Button>
);
