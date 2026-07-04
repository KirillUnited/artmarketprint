'use client';

import Clarity from '@microsoft/clarity';
import { useEffect } from 'react';

let clarityInitialized = false;

export default function ClarityInit({
	projectId,
	enabled = true,
}: {
	projectId: string;
	enabled?: boolean;
}) {
	useEffect(() => {
		if (!enabled) return;
		if (!projectId) return;
		if (clarityInitialized) return;

		Clarity.init(projectId);
		clarityInitialized = true;
	}, [enabled, projectId]);

	return null;
}