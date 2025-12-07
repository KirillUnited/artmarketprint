// Blog 404 Error Page
import Link from 'next/link';
import {Button} from '@heroui/button';

export default function NotFound() {
	return (
		<main className="container mx-auto py-24 text-center">
			<h1 className="text-5xl font-bold mb-4">404</h1>
			<p className="text-lg mb-8">Страница не найдена</p>
			<Link href="/">
				<Button>На главную</Button>
			</Link>
		</main>
	);
}
