import Link from 'next/link';
import { InstagramIcon, TelegramIcon, ViberIcon, WhatsAppIcon } from '../icons';

type SocialPlatform = 'instagram' | 'telegram' | 'viber' | 'whatsapp';

type SocialItem = {
	platform: SocialPlatform;
	url: string;
	title?: string;
};

type SocialsProps = {
	items: SocialItem[] | null | undefined;
};

export default function Socials({ items }: SocialsProps) {
	if (!Array.isArray(items) || items.length === 0) {
		return null;
	}

	return (
		<ul className="flex flex-row gap-3 items-center">
			{items.map((item) => {
				if (!item?.url) return null;

				const key = `${item.platform}-${item.url}`;

				switch (item.platform) {
					case 'instagram':
						return (
							<li key={key}>
								<Link
									href={item.url}
									target="_blank"
									aria-label="Follow us on Instagram"
								>
									<InstagramIcon />
								</Link>
							</li>
						);

					case 'telegram':
						return (
							<li
								key={key}
							>
								<Link
									href={item.url}
									target="_blank"
									aria-label="Contact us on Telegram"
								>
									<TelegramIcon />
								</Link>
							</li>
						);
					case 'viber':
						return (
							<li key={key}>
								<Link href={item.url} target="_blank" aria-label="Contact us on Viber">
									<ViberIcon />
								</Link>
							</li>
						);

					case 'whatsapp':
						return (
							<li key={key}>
								<Link href={item.url} target="_blank" aria-label="Contact us on WhatsApp">
									<WhatsAppIcon />
								</Link>
							</li>
						);

					default:
						return <li key={item.title ?? key}>Not found</li>;
				}
			})}
		</ul>
	);
}
