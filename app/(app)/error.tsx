'use client';

import {useEffect} from 'react';
import {Button} from '@heroui/button';

export default function GlobalError({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
	useEffect(() => {
		console.error('App Error:', error);
	}, [error]);

	return (
		<div className="text-center">
			<h1 className="text-6xl font-bold text-red-600">Что-то пошло не так</h1>
			<p className="mt-4 text-gray-700">{error.message || 'Произошла непредвиденная ошибка. Попробуйте еще раз.'}</p>
			<Button onPress={reset}>Try again</Button>
		</div>
	);
}
