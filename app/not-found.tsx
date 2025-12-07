import {Button} from '@heroui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="min-h-dvh bg-gray-100 flex flex-col items-center justify-center">
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10">
					<div className="text-center">
						<h1 className="text-6xl sm:text-8xl font-bold text-gray-900 tracking-tight mb-4">404</h1>
						<h2 className="text-2xl sm:text-3xl font-semibold mb-6">Страница не найдена</h2>
						<p className="text-gray-500 mb-8">Возможно, она была удалена, переименована или не существует.</p>
						<div className="space-x-4">
							<Link href="/">
								<Button color="primary" radius="sm" className="min-w-64 bg-brand-gradient uppercase font-semibold">
									На главную
								</Button>
							</Link>
						</div>
					</div>
					<Image src="/images/404.gif" alt="404" width={600} height={600} className="w-full h-full object-contain rounded-small" />
				</div>
			</div>
		</div>
	);
}
