'use client';
import {Button} from '@heroui/button';
import {ReactElement, useState} from 'react';
import {CheckIcon, CopyIcon} from 'lucide-react'; // Optional icons

/**
 * A button that copies the provided text to the clipboard.
 * @param {string} textToCopy - The text to copy.
 * @returns {ReactElement} A JSX element that represents the button.
 */
export default function CopyButton({textToCopy}: {textToCopy: string}): ReactElement {
	const [copied, setCopied] = useState<boolean>(false);

	const handleCopy = async (textToCopy: string): Promise<void> => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			// Reset after 2 seconds
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	};

	return (
		<Button
			isIconOnly
			className={'border-1'}
			color={copied ? 'success' : 'primary'}
			size={'sm'}
			startContent={copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
			title={copied ? 'Ссылка скопирована!' : 'Kопировать'}
			variant="bordered"
			onPress={() => handleCopy(textToCopy)}
		/>
	);
}
