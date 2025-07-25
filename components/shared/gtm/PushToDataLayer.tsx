'use client';

import {useEffect} from 'react';

export default function PushToDataLayer({data}: {data: any}) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push(data);
		}
	}, [data]);

	return null;
}
