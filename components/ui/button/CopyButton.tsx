'use client';
import {Button} from '@heroui/button';
import {ReactElement, useState} from 'react';
import {CheckIcon, CopyIcon} from 'lucide-react';
import {clsx} from 'clsx';
/**
 * A button that copies the provided text to the clipboard.
 * @param {string} textToCopy - The text to copy.
 * @param {string} className - Optional className for the button.
 * @returns {ReactElement} A JSX element that represents the button.
 */
export default function CopyButton({textToCopy, className}: {textToCopy: string; className?: string}): ReactElement {
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
			className={clsx('border-1', className)}
			color={copied ? 'success' : 'primary'}
			size={'sm'}
			startContent={copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
			title={copied ? 'Ссылка скопирована!' : 'Kопировать ссылку'}
			variant="bordered"
			onPress={() => handleCopy(textToCopy)}
		/>
	);
}
