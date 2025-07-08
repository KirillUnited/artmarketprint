'use client';

import {useEffect} from 'react';
import {Button} from '@heroui/button';
import {useRouter} from 'next/navigation';
import {ArrowLeftCircleFill, ExclamationTriangle} from 'react-bootstrap-icons';

export default function GlobalError({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
	const router = useRouter();

	useEffect(() => {
		console.error('App Error:', error);
	}, [error]);

	return (
		<div className="grid place-content-center gap-4 text-center py-10 min-h-96">
			<ExclamationTriangle size={48} className="text-warning-500 mx-auto" />
			<h1 className="text-2xl font-bold">Что-то пошло не так</h1>
			<p className="text-gray-700">{'Произошла непредвиденная ошибка. Попробуйте еще раз.'}</p>
			<Button className="w-fit mx-auto" radius="sm" onPress={reset}>
				Попробовать еще раз
			</Button>
			<Button className="w-fit mx-auto group" variant="bordered" color="primary" radius="sm" onPress={() => router.back()}>
				<ArrowLeftCircleFill className="group-hover:-translate-x-1 transition-transform" size={18} />
				Вернуться назад
			</Button>
		</div>
	);
}
