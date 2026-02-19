import type { ReactNode } from 'react';
import Link from 'next/link';
import { InstagramIcon, TelegramIcon, ViberIcon, WhatsAppIcon } from '../../icons';

type SocialPlatform = 'instagram' | 'telegram' | 'viber' | 'whatsapp';

type SocialItem = {
	platform: SocialPlatform;
	url: string;
	title?: string;
};

type SocialsProps = {
	items: SocialItem[] | null | undefined;
	children?: ReactNode;
};

type SocialsRootProps = {
	children: ReactNode;
};

type SocialsItemProps = SocialItem;

const platformConfig: Record<
	SocialPlatform,
	{ ariaLabel: string; Icon: typeof InstagramIcon }
> = {
	instagram: { ariaLabel: 'Follow us on Instagram', Icon: InstagramIcon },
	telegram: { ariaLabel: 'Contact us on Telegram', Icon: TelegramIcon },
	viber: { ariaLabel: 'Contact us on Viber', Icon: ViberIcon },
	whatsapp: { ariaLabel: 'Contact us on WhatsApp', Icon: WhatsAppIcon },
};

function SocialsRoot({ children }: SocialsRootProps) {
	return <ul className="flex flex-row gap-3 items-center">{children}</ul>;
}

function SocialsItem({ platform, url }: SocialsItemProps) {
	if (!url) return null;

	const config = platformConfig[platform];

	if (!config) return null;

	const { ariaLabel, Icon } = config;

	return (
		<li>
			<Link href={url} target="_blank" aria-label={ariaLabel}>
				<Icon />
			</Link>
		</li>
	);
}

function Socials({ items, children }: SocialsProps) {
	if (children) {
		return <SocialsRoot>{children}</SocialsRoot>;
	}

	if (!Array.isArray(items) || items.length === 0) {
		return null;
	}

	return (
		<SocialsRoot>
			{items.map((item) => {
				if (!item?.url) return null;

				const key = `${item.platform}-${item.url}`;

				return <SocialsItem key={key} {...item} />;
			})}
		</SocialsRoot>
	);
}

const SocialsCompound = Object.assign(Socials, {
	Root: SocialsRoot,
	Item: SocialsItem,
});

export default SocialsCompound;
