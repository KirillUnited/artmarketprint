'use client'
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';

type FullPageLoaderProps = {
	label?: string;
};

export default function FullPageLoader({ label = 'Загрузка...' }: FullPageLoaderProps) {
	return (
		<div className="fixed inset-0 z-100 flex items-center justify-center bg-background/95 backdrop-blur-lg">
			<div className='flex flex-col items-center'>
				<Loader className="static bg-brand-gradient text-fill-transparent" size="lg" variant="default" />
				<motion.span
					className="text-fill-transparent bg-brand-gradient m-2"
					initial={{ opacity: 0, y: -16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: 'easeOut' }}
				>
					{label}
				</motion.span>
			</div>
		</div>
	);
}
