import React from 'react';

function safeJsonLdStringify(value: unknown): string {
	return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function JsonLd({ id, data }: { id?: string; data: unknown }) {
	if (!data) return null;

	return (
		<script
			id={id}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(data) }}
		/>
	);
}